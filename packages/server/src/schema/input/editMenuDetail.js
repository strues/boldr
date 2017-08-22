import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
} from 'graphql';
import { GraphQLJSON } from '../scalars';

const EditDetailInput = new GraphQLInputObjectType({
  name: 'EditDetailInput',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The id',
    },
    title: {
      type: GraphQLString,
      description: 'The title text for the menu link',
    },
    safeName: {
      type: GraphQLString,
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
export default EditDetailInput;
