import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
} from 'graphql';

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
    isDropdown: {
      type: GraphQLBoolean,
      description: 'True if the item is a dropdown menu item',
    },
    order: {
      type: GraphQLInt,
      description: 'The display order',
    },
    href: {
      type: GraphQLString,
      description: 'The link',
    },
    icon: {
      type: GraphQLString,
      description: 'Icon kind',
    },
  }),
});
export default EditDetailInput;
