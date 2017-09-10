import { GraphQLBoolean, GraphQLString, GraphQLObjectType, GraphQLList, GraphQLID } from 'graphql';
import jsonResult from '@boldr/utils/lib/gql/jsonResult';
import { globalIdField, uuid, name } from '../field/identifier';
import { dateCU } from '../field/date';
import Menu from '../../models/Menu';
import MenuDetail from '../../models/MenuDetail';
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
    // dropdown: {
    //   type: new GraphQLList(MenuDetailType),
    //   description: 'Links',
    //   async resolve(root, args, context) {
    //     const details = await context.details
    //       .load(root.id).filter(detail => detail.parentId !== null);
    //     const dropdownItems = details.filter(detail => detail.parentId !== null);
    //     const dd = details.filter(detail => detail.id === dropdownItems[0].parentId);
    //     const dropdown = {
    //       ...dd,
    //       ...dropdownItems,
    //     };
    //     return details;
    //   },
    // },
    details: {
      type: new GraphQLList(MenuDetailType),
      description: 'Links',
      async resolve(root, args, context) {
        const details = await context.details.load(root.id);
        return details;
      },
    },
    ...dateCU,
  }),
});

export default MenuType;
