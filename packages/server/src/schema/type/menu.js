import { GraphQLBoolean, GraphQLString, GraphQLObjectType, GraphQLList, GraphQLID } from 'graphql';
import jsonResult from '@boldr/utils/lib/gql/jsonResult';
import { globalIdField, uuid, name } from '../field/identifier';
import { dateCU } from '../field/date';
import Menu from '../../models/Menu';
import MenuDetailType from './menuDetail';

const MenuType = new GraphQLObjectType({
  name: 'Menu',
  description: 'Navigation for the site',
  fields: () => ({
    id: globalIdField(),
    ...uuid,
    ...name,
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
      resolve(root) {
        return Menu.query()
          .findById(root.id)
          .then(result => result.$relatedQuery('details'))
          .then(jsonResult);
      },
    },
    ...dateCU,
  }),
});

export default MenuType;
