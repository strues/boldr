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
import {
  GraphQLEmail,
  GraphQLURL,
  GraphQLDateTime,
  GraphQLUUID,
  GraphQLJSON,
} from '../scalars';

const MediaType = new GraphQLObjectType({
  name: 'Media',
  description: 'Uploaded images, videos or audio',
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
    thumbName: {
      type: GraphQLString,
      description: 'thumbnail filename',
    },
    mediaType: {
      type: GraphQLString,
      description: 'mimetype',
    },
    fileDescription: {
      type: GraphQLString,
      description: 'The description of the upload',
    },
    mimetype: {
      type: GraphQLString,
      description: 'The description of the upload',
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

export default MediaType;
