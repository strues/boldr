import { GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql';
import File from '../../models/File';
import { errorObj } from '../../errors';
import FileType from './fileType';

export default {
  files: {
    type: new GraphQLList(FileType),
    description: 'A query for a listing of all attachments',
    args: {
      offset: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The number of attachments to offset',
      },
      limit: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The maximum number of attachments to return at a time.',
      },
    },
    async resolve(_, { limit, offset }) {
      const file = await File.query().limit(limit).offset(offset);
      if (file) {
        return file;
      }
      throw errorObj({ _error: 'Unable to locate file' });
    },
  },
};
