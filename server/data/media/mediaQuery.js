import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInt } from 'graphql';
import jsonResult from 'boldr-utils/lib/gql/jsonResult';
import { GraphQLEmail, GraphQLURL, GraphQLDateTime, GraphQLUUID, GraphQLJSON } from '../scalars';
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
      if (media) {
        return media;
      }
      console.log('error');
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
    async resolve(_, { id }, ctx) {
      const media = await ctx.media.load(id);
      if (media) {
        return media;
      }
      console.log('error');
    },
  },
};
