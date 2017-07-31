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
import { GraphQLEmail, GraphQLURL, GraphQLDateTime, GraphQLUUID, GraphQLJSON } from '../scalars';

const PermissionType = new GraphQLObjectType({
  name: 'Permission',
  description: 'Permissions are lists of rules that describe access to resources',
  fields: {
    id: {
      type: GraphQLID,
      description: 'Unique id for this permission',
    },
    name: {
      type: GraphQLString,
      description: 'The permission name',
    },
    rules: {
      type: new GraphQLList(GraphQLString),
      description: 'One or more Aperture sentences applying to the permission',
    },
    description: {
      type: GraphQLString,
      description: 'A description for this permission',
    },
  },
});

export default PermissionType;
