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
