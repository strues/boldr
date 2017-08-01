import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInt } from 'graphql';
import Media from '../../models/Media';
import MediaType from './mediaType';

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
    async resolve(_, { limit, offset }, ctx) {
      const media = await Media.query().returning('*');
      if (!media) {
        console.log('error');
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
    async resolve(_, { id }, context) {
      const media = await Media.getMediaById(id);
      if (!media) {
        console.log('error');
      }
      return media;
    },
  },
};
