import { GraphQLBoolean, GraphQLObjectType, GraphQLList } from 'graphql';
import { globalIdField, uuid, name, safeName } from '../field/identifier';
import { dateCU } from '../field/date';

import MenuDetailType from './menuDetail';

const MenuType = new GraphQLObjectType({
  name: 'Menu',
  description: 'Navigation for the site',
  fields: () => ({
    id: globalIdField(),
    ...uuid,
    ...name,
    ...safeName,
    restricted: {
      type: GraphQLBoolean,
      description: 'True if the menu should be hidden from unauth',
    },

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
