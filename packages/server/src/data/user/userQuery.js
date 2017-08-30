import { GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLID } from 'graphql';
import User from '../../models/User';
import { db } from '../../services/db';
import { errorObj } from '../../errors';
import UserType from '../../schema/type/user';

export default {
  getUsers: {
    type: new GraphQLList(UserType),
    description: 'A query for a listing of all users',
    args: {
      offset: {
        type: GraphQLInt,
        description: 'The number of users to offset',
      },
      limit: {
        type: GraphQLInt,
        description: 'The maximum number of users to return at a time.',
      },
    },
    async resolve() {
      const users = await db.table('user').select('*');
      if (users) {
        return users;
      }
      throw errorObj({ _error: 'Unable to find any users.' });
    },
  },
  getUserByUserId: {
    type: UserType,
    description: 'A query for admin to find a user by their id',
    args: {
      userId: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The user ID for the desired user',
      },
    },
    async resolve(_, { userId }, context) {
      const user = await context.users.load(userId);
      if (user) {
        return user;
      }
      throw errorObj({ _error: 'Unable to find a user with that id.' });
    },
  },
  getUserByUsername: {
    type: UserType,
    description: 'A query to retrieve a user by their username',
    args: {
      username: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The username for the desired user',
      },
    },
    async resolve(_, { username }) {
      const user = await User.getUserByUsername(username);
      if (user) {
        return user;
      }
      throw errorObj({ _error: 'Unable to find a user with that username.' });
    },
  },
  me: {
    type: UserType,
    description: 'Given an auth token, return the user and auth token',
    resolve(_, args, { user, ValidationError }) {
      if (!user) {
        throw new ValidationError('Unauthorized');
      }
      return user;
    },
  },
  getCurrentUser: {
    type: UserType,
    description: 'Given an auth token, return the user and auth token',
    async resolve(_, args, context) {
      const user = await User.query().findById(context.user.id);
      if (!user) {
        console.log('error');
      }
      return user;
    },
  },
};
