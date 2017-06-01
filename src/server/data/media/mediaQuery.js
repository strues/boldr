import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInt } from 'graphql';
import jsonResult from 'boldr-utils/es/gql/jsonResult';
import {
  GraphQLEmail,
  GraphQLURL,
  GraphQLDateTime,
  GraphQLUUID,
  GraphQLJSON,
} from '../scalars';
import Media from '../../models/Media';
import MediaType from './mediaType';

export default {
  getMedia: {
    type: new GraphQLList(MediaType),
    description: 'A query for a listing of all media',
    args: {
      offset: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The number of media to offset',
      },
      limit: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The maximum number of media to return at a time.',
      },
    },
    async resolve(_, { limit, offset }, context) {
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
        type: new GraphQLNonNull(GraphQLUUID),
        description: 'The id of the requested media',
      },
    },
    async resolve(_, { id }, context) {
      const media = await Media.getMediaById(id);
      if (media) {
        return media;
      }
      console.log('error');
    },
  },
};
