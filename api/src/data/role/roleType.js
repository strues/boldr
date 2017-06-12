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
import UserType from '../user/userType';

const RoleType = new GraphQLObjectType({
  name: 'Role',
  description: 'Role or permission group for users',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The role id',
    },
    uuid: {
      type: GraphQLUUID,
      description: 'The role uuid',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the role',
    },
    image: {
      type: GraphQLURL,
      description: 'An image for role identification',
    },
    description: {
      type: GraphQLString,
      description: 'The role description',
    },

    users: {
      type: new GraphQLList(UserType),
      description: 'Users belonging to a role.',
    },
  }),
});

export default RoleType;
