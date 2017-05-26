import { GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
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
    async resolve(_, { id }, context) {
      const media = await Media.query().getMediaById(id).then(jsonResult);
      if (media) {
        return media;
      }
      console.log('error');
    },
  },
};
