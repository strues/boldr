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
import jsonResult from 'boldr-utils/lib/gql/jsonResult';
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
      type: GraphQLString,
      description: 'The name of the menu',
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
      resolve(_, args, ctx) {
        return Menu.query()
          .findById(_.id)
          .then(result => result.$relatedQuery('details'))
          .then(jsonResult);
      },
    },
  }),
});

export default MenuType;
