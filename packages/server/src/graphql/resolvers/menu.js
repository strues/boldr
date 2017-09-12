/* eslint-disable no-unused-vars */
import _debug from 'debug';
import { errorObj } from '../../errors';

const menuResolvers = {
  Menu: {
    details: async (obj, args, context) => {
      const details = await context.loaders.details.load(obj.id);
      return details;
    },
  },
  Query: {
    getMenuById: async (obj, { id }, context) => {
      const menu = await context.loaders.menus.load(id);
      if (menu) {
        return menu;
      }
      throw errorObj({ _error: 'Unable to locate menu' });
    },
  },
};

export default menuResolvers;
