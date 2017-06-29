import { GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import jsonResult from 'boldr-utils/lib/gql/jsonResult';
import {
  GraphQLEmail,
  GraphQLURL,
  GraphQLLimitedString,
  GraphQLPassword,
  GraphQLDateTime,
  GraphQLUUID,
} from '../scalars';
import { db } from '../../services/db';
import Menu from '../../models/Menu';
import MenuDetail from '../../models/MenuDetail';
import MenuType from './menuType';
import MenuDetailType from './menuDetailType';

export default {
  getMenuById: {
    type: MenuType,
    description: 'A query for a specific menu',
    args: {
      id: { type: GraphQLID },
    },
    async resolve(_, { id }, context) {
      const menu = await Menu.query().findById(id);
      if (menu) {
        return menu;
      }
      console.log('error');
    },
  },
  details: {
    type: new GraphQLList(MenuDetailType),
    description: 'A query returning all links',
    async resolve(_, args, context) {
      const details = await db.table('menu_detail').select('*');
      if (!details) {
        return console.log('err');
      }
      return details;
    },
  },
};
