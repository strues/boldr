import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
} from 'graphql';
import { GraphQLJSON } from '../scalars';
import MenuDetail from '../../models/MenuDetail';
import { globalIdField, safeName } from '../field/identifier';
import { dateCUD } from '../field/date';

const MenuDetailType = new GraphQLObjectType({
  name: 'MenuDetail',
  description: 'links and other menu content',
  fields: () => ({
    id: globalIdField(),
    title: {
      type: GraphQLString,
      description: 'The title text for the menu link',
    },
    ...safeName,
    cssClassname: {
      type: GraphQLString,
      description: 'Custom css classname for the link',
    },
    hasDropdown: {
      type: GraphQLBoolean,
      description: 'True if the item has a dropdown',
    },
    isDropdown: {
      type: GraphQLBoolean,
      description: 'True if the item has is a dropdown item',
    },
    order: {
      type: GraphQLInt,
      description: 'The display order',
    },
    mobileHref: {
      type: GraphQLString,
      description: 'Mobile only link',
    },
    menuId: {
      type: GraphQLID,
      description: 'The id of the menu the detail belongs to.',
    },
    parentId: {
      type: GraphQLID,
      description: 'The id of the menu the detail belongs to.',
    },
    href: {
      type: GraphQLString,
      description: 'The link',
    },
    icon: {
      type: GraphQLString,
      description: 'Icon kind',
    },
    ...dateCUD,
  }),
});

export default MenuDetailType;
