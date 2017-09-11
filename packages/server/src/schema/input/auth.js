import { GraphQLString, GraphQLNonNull, GraphQLInputObjectType } from 'graphql';

import { GraphQLEmail } from '../scalars';

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
  }),
});

export const AuthInput = new GraphQLInputObjectType({
  name: 'AuthInput',
  fields: () => ({
    email: {
      type: new GraphQLNonNull(GraphQLEmail),
      description: 'The email address for the account to create or login to.',
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The password belonging to the account.',
    },
  }),
});
