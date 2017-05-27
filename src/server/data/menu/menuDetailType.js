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
import {
  GraphQLEmail,
  GraphQLURL,
  GraphQLLimitedString,
  GraphQLPassword,
  GraphQLDateTime,
  GraphQLUUID,
  GraphQLJSON,
} from '../scalars';

const MenuDetailType = new GraphQLObjectType({
  name: 'MenuDetail',
  description: 'links and other menu content',
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
  }),
});

export default MenuDetailType;
