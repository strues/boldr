/* eslint-disable no-unused-vars */
import uuid from 'uuid';
import _debug from 'debug';
import { GraphQLError } from 'graphql';
import addDays from 'date-fns/add_days';
import { errorObj } from '../../errors';
import { mailer, signToken } from '../../services';
import { validatePassword } from '../../services/authentication/authService';
import { welcomeEmail } from '../../services/mailer/templates';

const debug = _debug('boldr:server:graphql:resolvers:account');

const accountResolvers = {
  Account: {
    roles: async (obj, args, { models: { Account } }, info) => {
      const roles = await Account.query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('roles'));
      if (roles) {
        return roles;
      }
      throw errorObj({ _error: 'Unable to find any users.' });
    },
    profile: async (obj, args, { models: { Account } }, info) => {
      const profile = await Account.query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('profile'));
      if (profile) {
        return profile;
      }
      throw errorObj({ _error: 'Unable to find any users.' });
    },
    articles: async (obj, args, { models: { Account } }) => {
      const articles = await Account.query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('articles'));
      if (articles) {
        return articles;
      }
      throw errorObj({ _error: 'Unable to find any users.' });
    },
    uploads: async (obj, args, { models: { Account } }) => {
      const uploads = await Account.query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('uploads'));

      if (uploads) {
        return uploads;
      }
      throw errorObj({ _error: 'Unable to find any users.' });
    },
  },
  Query: {
    accounts: async (obj, args, { models: { Account } }) => {
      const accounts = await Account.query();
      if (accounts) {
        return accounts;
      }
      throw errorObj({ _error: 'Unable to find any users.' });
    },
    account: async (obj, { id, email }, ctx) => {
      let acc;
      if (id) {
        acc = await ctx.models.Account.query().findById(id);
        return acc;
      }
      if (email) {
        acc = await ctx.models.Account
          .query()
          .where('account.email', '=', email)
          .first();
        return acc;
      }
      throw errorObj({ _error: 'Unable to find a user with that id.' });
    },
    me: (obj, args, { user, ValidationError, req }) => {
      if (!user) {
        throw new ValidationError('Unauthorized');
      }
      if (user.id !== req.session.user.id) {
        throw new ValidationError('Unauthorized');
      }
      return user;
    },
  },
  Mutation: {
    signupAccount: async (obj, { input }, ctx) => {
      const checkUser = await ctx.models.Account
        .query()
        .where({ email: input.email })
        .first();

      if (checkUser) {
        return new Error('The account already exists');
      }

      const newAccount = await ctx.models.Account.query().insert({
        email: input.email,
        password: input.password,
        verificationToken: uuid.v4(),
        verificationTokenExp: addDays(new Date(), 1),
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
    loginAccount: async (obj, { input }, ctx) => {
      const account = await ctx.models.Account
        .query()
        .where({ email: input.email })
        .eager('[roles,profile]')
        .first();

      if (!account) {
        throw new GraphQLError('Incorrect email and/or password.');
      }

      const validAccount = await account.authenticate(input.password);

      if (!validAccount) {
        throw new GraphQLError('Incorrect email and/or password.');
      }

      // remove the password from the response.
      account.stripPassword();
      try {
        await account.$query().patch({ lastLogin: new Date().toISOString() });
      } catch (err) {
        throw new GraphQLError('Unable to update last login');
      }
      // sign the token
      const token = await signToken(account);

      return {
        token,
        account,
      };
    },
  },
};

export default accountResolvers;
