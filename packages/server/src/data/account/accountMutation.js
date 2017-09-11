import { GraphQLID, GraphQLNonNull, GraphQLError } from 'graphql';
import uuid from 'uuid';
import addDays from 'date-fns/add_days';
import { mailer, signToken } from '../../services';
import { welcomeEmail } from '../../services/mailer/templates';
import Account from '../../models/Account';
import { AccountLoginResponse } from '../../schema/type/auth';
import { AuthInput } from '../../schema/input/auth';
import AccountType from '../../schema/type/account';

export default {
  loginAccount: {
    type: AccountLoginResponse,
    description: 'Authenticates a user and returns a signed JWT.',
    args: {
      input: {
        type: new GraphQLNonNull(AuthInput),
      },
    },
    async resolve(obj, { input }, context) {
      const account = await Account.query()
        .where({ email: input.email })
        .eager('[roles,profile]')
        .first();

      if (!account || !await account.authenticate(input.password)) {
        throw new GraphQLError('Incorrect email and/or password.');
      }

      // remove the password from the response.
      account.stripPassword();
      await account.$query().patch({ lastLogin: new Date().toISOString() });
      // sign the token
      const token = await signToken(account);
      context.req.user = account;

      return {
        token,
        account,
      };
    },
  },
  signupAccount: {
    type: AccountType,
    description: 'Register a new account.',
    args: {
      input: {
        type: new GraphQLNonNull(AuthInput),
      },
    },
    async resolve(obj, { input }, context) {
      const checkUser = await Account.query()
        .where({ email: input.email })
        .first();

      if (checkUser) {
        return new Error('The account already exists');
      }

      const newAccount = await Account.query().insert({
        email: input.email,
        password: input.password,
        verificationToken: uuid.v4(),
        verificationTokenExp: addDays(new Date(), 1),
        ip: context.req.headers['x-forwarded-for'] || context.req.connection.remoteAddress,
      });
      await newAccount.$relatedQuery('roles').relate({ id: 1 });

      if (!newAccount) {
        return new Error('Signup failed');
      }
      // generate user verification token to send in the email.
      const verifToken = newAccount.verificationToken;
      // get the mail template
      const mailBody = welcomeEmail(verifToken);
      // subject
      const mailSubject = 'Boldr User Verification';
      // send the welcome email
      mailer(newAccount, mailBody, mailSubject);

      return newAccount;
    },
  },
};
