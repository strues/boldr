import { GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLInputObjectType } from 'graphql';

const Upload = new GraphQLInputObjectType({
  name: 'Upload',
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

export default Upload;
