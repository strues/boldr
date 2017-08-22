import { GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql';
import ErrorType from './error';
import UserType from './user';

export const UserLoginResponse = new GraphQLObjectType({
  name: 'UserLoginResponse',
  fields: () => ({
    token: {
      type: GraphQLString,
      description: 'The JSONWebToken for the user.',
    },
    user: {
      type: UserType,
      description: 'The user who logged in.',
    },
    errors: {
      type: new GraphQLList(ErrorType),
      description: 'Any auth related errors.',
    },
  }),
});
