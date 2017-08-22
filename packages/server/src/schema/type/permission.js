import { GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql';
import { globalIdField, name } from '../field/identifier';
import { dateCUD } from '../field/date';

const PermissionType = new GraphQLObjectType({
  name: 'Permission',
  description: 'Permissions are lists of rules that describe access to resources',
  fields: {
    id: globalIdField(),
    ...name,
    rules: {
      type: new GraphQLList(GraphQLString),
      description: 'One or more Aperture sentences applying to the permission',
    },
    description: {
      type: GraphQLString,
      description: 'A description for this permission',
    },
    ...dateCUD,
  },
});

export default PermissionType;
