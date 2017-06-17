import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLString } from 'graphql';
import Tag from '../../models/Tag';
import TagType, { TagInput } from './tagType';

export default {
  addTag: {
    type: TagType,
    description: 'creating a new tag',
    args: {
      input: {
        type: new GraphQLNonNull(TagInput),
      },
    },
    async resolve(_, args, context) {
      const payload = await Tag.query().saveAndFetch(args.input);
      return payload;
    },
  },
};
