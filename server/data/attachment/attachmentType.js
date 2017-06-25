import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
} from 'graphql';
import { GraphQLEmail, GraphQLURL, GraphQLDateTime, GraphQLUUID } from '../scalars';

const AttachmentType = new GraphQLObjectType({
  name: 'Attachment',
  description: 'Attachments are files uploaded by users',
  fields: () => ({
    id: {
      type: GraphQLUUID,
      description: 'The identifying uuid.',
    },
    fileName: {
      type: GraphQLString,
      description: 'The name of the file',
    },
    safeName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'identifier which cannot be changed',
    },
    fileType: {
      type: GraphQLString,
      description: 'mimetype',
    },
    description: {
      type: GraphQLString,
      description: 'The role description',
    },
    path: {
      type: GraphQLString,
      dsescription: 'The local path where the file is stored',
    },
    url: {
      type: GraphQLString,
      description: 'The relative url to access the file',
    },
    userId: {
      type: GraphQLUUID,
      description: 'The id of the user the file belongs to.',
    },
    createdAt: {
      type: GraphQLDateTime,
      description: 'The timestamp when the article was created',
    },
    updatedAt: {
      type: GraphQLDateTime,
      description: 'The timestamp when the article was last updated',
    },
  }),
});

export default AttachmentType;
