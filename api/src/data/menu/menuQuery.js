import { GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import jsonResult from 'boldr-utils/es/gql/jsonResult';
import {
  GraphQLEmail,
  GraphQLURL,
  GraphQLLimitedString,
  GraphQLPassword,
  GraphQLDateTime,
  GraphQLUUID,
} from '../scalars';
import Menu from '../../models/Menu';
import MenuType from './menuType';

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
};
