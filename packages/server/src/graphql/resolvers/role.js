/* eslint-disable no-unused-vars */
import _debug from 'debug';
import { errorObj } from '../../errors';

const roleResolvers = {
  Role: {
    accounts: async (obj, args, ctx, info) => {
      const accounts = await ctx.models.Role
        .query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('accounts'));
      if (accounts) {
        return accounts;
      }
      throw errorObj({ _error: 'Unable to find any users.' });
    },
  },
  Query: {
    roles: async (obj, args, ctx) => {
      const roles = await ctx.models.Role.query();
      if (roles) {
        return roles;
      }
      throw errorObj({ _error: 'Unable to find roles.' });
    },
  },
};

export default roleResolvers;
