import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLEnumType,
} from 'graphql';
import { GraphQLEmail, GraphQLURL, GraphQLDateTime, GraphQLUUID, GraphQLJSON } from '../scalars';

const MediaTypeType = new GraphQLEnumType({
  name: 'MediaType',
  values: {
    image: { value: 'image' },
    video: { value: 'video' },
    audio: { value: 'audio' },
  },
});

const MediaType = new GraphQLObjectType({
  name: 'Media',
  description: 'Uploaded images, videos or audio',
  fields: () => ({
    id: {
      type: GraphQLUUID,
      description: 'The identifying uuid.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the file',
    },
    safeName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'identifier which cannot be changed',
    },
    thumbName: {
      type: GraphQLString,
      description: 'thumbnail filename',
    },
    mediaType: {
      type: MediaTypeType,
      description: 'Type of media can be Image, Audio, or Video',
    },
    fileDescription: {
      type: GraphQLString,
      description: 'The description of the upload',
    },
    type: {
      type: GraphQLString,
      description: 'The mimetype of the upload',
    },
    size: {
      type: GraphQLInt,
      description: 'The size of the upload',
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

export const FileType = new GraphQLObjectType({
  name: 'File',
  fields: () => ({
    id: {
      type: GraphQLUUID,
      description: 'The identifying uuid.',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The file name',
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The type of file.',
    },
    size: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The size of the file',
    },
    path: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The path to the file.',
    },
  }),
});

export const UploadMediaInput = new GraphQLInputObjectType({
  name: 'UploadMediaInput',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The file name',
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The type of file.',
    },
    size: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The size of the file',
    },
    path: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The path to the file.',
    },
  }),
});

export default MediaType;
