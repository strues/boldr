import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInt } from 'graphql';
import Media from '../../models/Media';
import { errorObj } from '../../errors';
import MediaType from '../../schema/type/media';

export default {
  getMedia: {
    type: new GraphQLList(MediaType),
    description: 'A query for a listing of all media',
    args: {
      offset: {
        type: GraphQLInt,
        description: 'The number of media to offset',
      },
      limit: {
        type: GraphQLInt,
        description: 'The maximum number of media to return at a time.',
      },
    },
    async resolve() {
      const media = await Media.query().returning('*');
      if (!media) {
        throw errorObj({ _error: 'Unable to locate media' });
      }
      return media;
    },
  },
  getMediaById: {
    type: MediaType,
    description: 'A query for a returning a single media by its id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The id of the requested media',
      },
    },
    async resolve(_, { id }) {
      const media = await Media.getMediaById(id);
      if (!media) {
        throw errorObj({ _error: 'Unable to locate a file with that id' });
      }
      return media;
    },
  },
};
