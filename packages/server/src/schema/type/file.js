import { GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLInt } from 'graphql';
import { globalIdField, name } from '../field/identifier';
import { dateCUD } from '../field/date';

const FileType = new GraphQLObjectType({
  name: 'File',
  fields: () => ({
    id: globalIdField(),
    ...name,
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
    ...dateCUD,
  }),
});

export default FileType;
