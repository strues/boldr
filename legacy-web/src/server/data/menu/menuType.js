import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
} from 'graphql';
import jsonResult from 'boldr-utils/es/gql/jsonResult';
import {
  GraphQLEmail,
  GraphQLURL,
  GraphQLLimitedString,
  GraphQLPassword,
  GraphQLDateTime,
  GraphQLUUID,
  GraphQLJSON,
} from '../scalars';
import Menu from '../../models/Menu';
import MenuDetailType from './menuDetailType';

const MenuType = new GraphQLObjectType({
  name: 'Menu',
  description: 'Navigation for the site',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The id',
    },
    uuid: {
      type: GraphQLUUID,
      description: 'The uuid',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the role',
    },
    safeName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Lowercase, normalized, name',
    },
    attributes: {
      type: GraphQLString,
      description: 'Custom css classname for the link',
    },
    restricted: {
      type: GraphQLBoolean,
      description: 'True if the menu should be hidden from unauth',
    },
    details: {
      type: new GraphQLList(MenuDetailType),
      description: 'Links',
      resolve(menu, args, ctx) {
        return Menu.query()
          .findById(menu.id)
          .then(result => result.$relatedQuery('details'))
          .then(jsonResult);
      },
    },
  }),
});

export default MenuType;
