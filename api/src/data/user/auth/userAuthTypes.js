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
import { GraphQLEmail, GraphQLURL, GraphQLDateTime, GraphQLUUID, GraphQLJSON } from '../../scalars';

import UserType from '../userType';

export const UserLoginInput = new GraphQLInputObjectType({
  name: 'UserLoginInput',
  fields: () => ({
    email: {
      type: new GraphQLNonNull(GraphQLEmail),
      description: 'The email address of the account to login to.',
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The password belonging to the account.',
    },
  }),
});
export const UserSignupInput = new GraphQLInputObjectType({
  name: 'UserSignupInput',
  fields: () => ({
    email: {
      type: new GraphQLNonNull(GraphQLEmail),
      description: 'The email address of the account to login to.',
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The password belonging to the account.',
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The username for the new user',
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The first name of the user.',
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The last name of the user.',
    },
  }),
});
export const AuthError = new GraphQLObjectType({
  name: 'AuthError',
  fields: () => ({
    key: {
      type: GraphQLString,
      description: 'The error key.',
    },
    value: {
      type: GraphQLString,
      description: 'The error message.',
    },
  }),
});

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
      type: new GraphQLList(AuthError),
      description: 'Any auth related errors.',
    },
  }),
});
