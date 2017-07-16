import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLString } from 'graphql';
import { GraphQLEmail, GraphQLURL, GraphQLDateTime, GraphQLUUID, GraphQLJSON } from '../scalars';
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
      const payload = await Tag.query().insert(args.input).returning('*');
      return payload;
    },
  },
  editTag: {
    type: TagType,
    description: 'Edit an existing tag',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLUUID),
        description: 'The tag ID',
      },
      input: {
        type: new GraphQLNonNull(TagInput),
        description: 'The fields (name, description) for editing a tag.',
      },
    },
    async resolve(_, args, context) {
      debug(args);
      const updatedTag = await Tag.query().patchAndFetchById(args.id, {
        name: args.input.name,
        description: args.input.description,
      });
      return updatedTag;
    },
  },
};
