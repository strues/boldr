import { GraphQLID, GraphQLNonNull, GraphQLError } from 'graphql';
import uuid from 'uuid';
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

      const newAccount = await Account.query().insert(input);
      await newAccount.$relatedQuery('roles').relate({ id: 1 });

      if (!newAccount) {
        return new Error('Signup failed');
      }
      // generate user verification token to send in the email.
      const verifToken = uuid.v4();
      // get the mail template
      const mailBody = welcomeEmail(verifToken);
      // subject
      const mailSubject = 'Boldr User Verification';
      // send the welcome email
      mailer(newAccount, mailBody, mailSubject);
      // create a relationship between the user and the token
      await newUser.$relatedQuery('verificationToken').insert({
        ip: context.req.ip,
        token: verifToken,
        userId: newUser.id,
      });
      return newUser;
    },
  },
};
