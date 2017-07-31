import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInt } from 'graphql';
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
        description: 'The maximum number of tags to return at a time.',
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    async resolve(_, { limit, offset }) {
      const tags = await Tag.query().offset(offset).limit(limit).skipUndefined();
      if (tags) {
        return tags;
      }
      console.log('error');
    },
  },
};
