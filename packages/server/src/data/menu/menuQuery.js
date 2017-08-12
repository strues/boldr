import { GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';

import { db } from '../../services/db';
import Menu from '../../models/Menu';
import { errorObj } from '../../errors';
import MenuType from './menuType';
import MenuDetailType from './menuDetailType';

export default {
  getMenuById: {
    type: MenuType,
    description: 'A query for a specific menu',
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(_, { id }) {
      const menu = await Menu.query().findById(id);
      if (menu) {
        return menu;
      }
      throw errorObj({ _error: 'Unable to locate menu' });
    },
  },
  details: {
    type: new GraphQLList(MenuDetailType),
    description: 'A query returning all links',
    async resolve() {
      const details = await db.table('menu_detail').select('*');
      if (!details) {
        throw errorObj({ _error: 'Unable to find any links' });
      }
      return details;
    },
  },
};
