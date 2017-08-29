import { GraphQLString, GraphQLInputObjectType } from 'graphql';
import { name, slug } from '../field/identifier';

const CreateContentTypeInput = new GraphQLInputObjectType({
  name: 'CreateContentTypeInput',
  fields: () => ({
    ...name,
    ...slug,
    icon: {
      type: GraphQLString,
      description: 'An icon to use for the content type',
    },
    description: {
      type: GraphQLString,
      description: 'A description of the tag',
    },
  }),
});

export default CreateContentTypeInput;
