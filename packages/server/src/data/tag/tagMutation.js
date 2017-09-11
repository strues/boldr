import { GraphQLNonNull, GraphQLID, GraphQLBoolean } from 'graphql';
import slugIt from '../../utils/slugIt';
import Tag from '../../models/Tag';
import TagType from '../../schema/type/tag';
import EditTagInput from '../../schema/input/editTag';
import CreateTagInput from '../../schema/input/createTag';

export default {
  addTag: {
    type: TagType,
    description: 'creating a new tag',
    args: {
      input: {
        type: new GraphQLNonNull(CreateTagInput),
      },
    },
    async resolve(_, args) {
      const payload = await Tag.query()
        .insert({
          name: args.input,
          safeName: slugIt(args.input),
        })
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
        type: new GraphQLNonNull(EditTagInput),
        description: 'The fields (name, description) for editing a tag.',
      },
    },
    async resolve(_, args) {
      debug(args);
      const updatedTag = await Tag.query().patchAndFetchById(args.id, {
        name: args.input.name,
        safeName: slugIt(args.input.name),
      });
      return updatedTag;
    },
  },
  deleteTag: {
    type: GraphQLBoolean,
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
