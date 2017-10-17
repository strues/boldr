/* eslint-disable no-unused-vars */
import _debug from 'debug';
import { errorObj } from '../../errors';

const debug = _debug('boldr:server:graphql:resolvers:menu');

const menuResolvers = {
  Menu: {
    details: async (obj, args, context) => {
      const details = await context.loaders.details.load(obj.id);
      return details;
    },
  },
  Query: {
    getMenuById: async (obj, { id }, ctx) => {
      const menu = await ctx.models.Menu.query().findById(id);
      if (menu) {
        return menu;
      }
      throw errorObj({ _error: 'Unable to locate menu' });
    },
  },
};

export default menuResolvers;
