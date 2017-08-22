import { GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLInputObjectType } from 'graphql';

const UploadMediaInput = new GraphQLInputObjectType({
  name: 'UploadMediaInput',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The file name',
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The type of file.',
    },
    size: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The size of the file',
    },
    path: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The path to the file.',
    },
  }),
});

export default UploadMediaInput;
