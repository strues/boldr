import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql';
import { GraphQLJSON } from '../scalars';
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
    order: {
      type: GraphQLInt,
      description: 'The display order',
    },
    mobileHref: {
      type: GraphQLString,
      description: 'Mobile only link',
    },
    href: {
      type: GraphQLString,
      description: 'The link',
    },
    icon: {
      type: GraphQLString,
      description: 'Icon kind',
    },
    children: {
      type: GraphQLJSON,
      description: 'Children are dropdown links',
    },
    ...dateCUD,
  }),
});

export default MenuDetailType;
