import { GraphQLList, GraphQLInt, GraphQLID } from 'graphql';
import Account from '../../models/Account';
import { db } from '../../services/db';
import { errorObj } from '../../errors';
import { GraphQLEmail } from '../../schema/scalars';
import AccountType from '../../schema/type/account';

export default {
  accounts: {
    type: new GraphQLList(AccountType),
    description: 'A query for a listing of all accounts',
    args: {
      offset: {
        type: GraphQLInt,
        description: 'The number of accounts to offset',
      },
      limit: {
        type: GraphQLInt,
        description: 'The maximum number of accounts to return at a time.',
      },
    },
    async resolve() {
      const accounts = await db.table('account').select('*');
      if (accounts) {
        return accounts;
      }
      throw errorObj({ _error: 'Unable to find any users.' });
    },
  },
  account: {
    type: AccountType,
    description: 'Find an account by the id, username or email',
    args: {
      id: {
        type: GraphQLID,
        description: 'The user ID for the desired account',
      },
      email: {
        type: GraphQLEmail,
        description: 'An email address to query for the account',
      },
    },
    async resolve(obj, { id, email }, context) {
      let acc;
      if (id) {
        acc = await context.accounts.load(id);
        return acc;
      }
      if (email) {
        acc = await Account.query()
          .where('account.email', '=', email)
          .first();
        return acc;
      }
      throw errorObj({ _error: 'Unable to find a user with that id.' });
    },
  },
  me: {
    type: AccountType,
    description: 'Given an auth token, return the user and auth token',
    resolve(obj, args, { user, ValidationError, req }) {
      if (!user) {
        throw new ValidationError('Unauthorized');
      }
      if (user.id !== req.session.user.id) {
        throw new ValidationError('Unauthorized');
      }
      return user;
    },
  },
};
