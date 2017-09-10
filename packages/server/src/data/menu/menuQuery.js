import { GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';

import { db } from '../../services/db';
import Menu from '../../models/Menu';
import MenuDetail from '../../models/MenuDetail';
import { errorObj } from '../../errors';
import MenuType from '../../schema/type/menu';
import MenuDetailType from '../../schema/type/menuDetail';

export default {
  getMenuById: {
    type: MenuType,
    description: 'A query for a specific menu',
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(_, { id }, context) {
      const menu = await context.menus.load(id);
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
      const details = await MenuDetail.query().eager('[menu,dropdown,dropdownItems]');
      if (!details) {
        throw errorObj({ _error: 'Unable to find any links' });
      }
      return details;
    },
  },
};
