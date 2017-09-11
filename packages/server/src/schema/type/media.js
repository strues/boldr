import { GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLInt } from 'graphql';
import { globalIdField, name, safeName } from '../field/identifier';
import { dateCU } from '../field/date';

const MediaType = new GraphQLObjectType({
  name: 'Media',
  description: 'Uploaded images, videos or audio',
  fields: () => ({
    id: globalIdField(),
    ...name,
    ...safeName,

    thumbName: {
      type: GraphQLString,
      description: 'thumbnail filename',
    },
    fileDescription: {
      type: GraphQLString,
      description: 'The description of the upload',
    },
    type: {
      type: GraphQLString,
      description: 'The mime-type of the upload',
    },
    size: {
      type: GraphQLInt,
      description: 'The size of the upload',
    },
    path: {
      type: GraphQLString,
      description: 'The local path where the file is stored',
    },
    url: {
      type: GraphQLString,
      description: 'The relative url to access the file',
    },
    ownerId: {
      type: GraphQLID,
      description: 'The id of the user the file belongs to.',
    },
    ...dateCU,
  }),
});

export default MediaType;
