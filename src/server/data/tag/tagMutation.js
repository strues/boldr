import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import Tag from '../../models/Tag';
import TagType, { AddTagInput } from './tagType';

export default {
  addTag: {
    type: TagType,
    description: 'creating a new tag',
    args: {
      tag: {
        type: new GraphQLNonNull(AddTagInput),
      },
    },
    async resolve(_, args, context) {
      const payload = await Tag.query().saveAndFetch(args.tag);
      return payload;
    },
  },
};
