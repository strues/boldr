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

const FileType = new GraphQLObjectType({
  name: 'File',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The identifying uuid.',
    },
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

export default FileType;
