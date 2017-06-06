import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInt } from 'graphql';
import jsonResult from 'boldr-utils/es/gql/jsonResult';
import {
  GraphQLEmail,
  GraphQLURL,
  GraphQLDateTime,
  GraphQLUUID,
  GraphQLJSON,
} from '../scalars';
import Tag from '../../models/Tag';
import TagType from './tagType';

export default {
  getTags: {
    type: new GraphQLList(TagType),
    description: 'A query for a listing of all tags',
    args: {
      offset: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The number of tags to offset',
      },
      limit: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The maximum number of tags to return at a time.',
      },
    },
    async resolve(_, { limit, offset }, context) {

      const tags = await Tag.query().offset(offset).limit(limit);
      if (tags) {
        return tags;
      }
      console.log('error');
    },
  },
};
