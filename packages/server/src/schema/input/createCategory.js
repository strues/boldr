import { GraphQLString, GraphQLInputObjectType } from 'graphql';
import { name, slug } from '../field/identifier';

const CreateCategoryInput = new GraphQLInputObjectType({
  name: 'CreateCategoryInput',
  fields: () => ({
    ...name,
    ...slug,
    icon: {
      type: GraphQLString,
      description: 'An icon to use for the category',
    },
    description: {
      type: GraphQLString,
      description: 'A description of the category',
    },
  }),
});

export default CreateCategoryInput;
