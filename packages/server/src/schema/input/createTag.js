import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

const CreateTagInput = new GraphQLInputObjectType({
  name: 'CreateTagInput',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the tag',
    },
    safeName: {
      type: GraphQLString,
      description: 'Automatically slugified version of the name',
    },
  }),
});

export default CreateTagInput;
