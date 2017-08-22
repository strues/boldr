import { GraphQLString, GraphQLNonNull, GraphQLInputObjectType } from 'graphql';

const EditMediaInput = new GraphQLInputObjectType({
  name: 'EditMediaInput',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The file name',
    },
    fileDescription: {
      type: GraphQLString,
      description: 'A description of the file',
    },
  }),
});

export default EditMediaInput;
