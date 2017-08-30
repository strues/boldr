import { GraphQLNonNull, GraphQLID } from 'graphql';
import Tag from '../../models/Tag';
import TagType from '../../schema/type/tag';
import TagInput from '../../schema/input/tag';

export default {
  addTag: {
    type: TagType,
    description: 'creating a new tag',
    args: {
      input: {
        type: new GraphQLNonNull(TagInput),
      },
    },
    async resolve(_, args) {
      const payload = await Tag.query()
        .insert(args.input)
        .returning('*');
      return payload;
    },
  },
  editTag: {
    type: TagType,
    description: 'Edit an existing tag',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The tag ID',
      },
      input: {
        type: new GraphQLNonNull(TagInput),
        description: 'The fields (name, description) for editing a tag.',
      },
    },
    async resolve(_, args) {
      debug(args);
      const updatedTag = await Tag.query().patchAndFetchById(args.id, {
        name: args.input.name,
        description: args.input.description,
      });
      return updatedTag;
    },
  },
  deleteTag: {
    type: TagType,
    description: 'Remove a tag from the database',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The tag ID',
      },
    },
    resolve(_, args) {
      return Tag.query().deleteById(args.id);
    },
  },
};
