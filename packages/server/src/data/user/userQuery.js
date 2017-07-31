import { GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLID } from 'graphql';
import _debug from 'debug';
import { GraphQLUUID } from '../scalars';
import User from '../../models/User';
import { db } from '../../services/db';
import UserType from './userType';

const debug = _debug('boldr:server:userQuery');

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
    async resolve(_, { limit, offset }, context) {
      debug(context);
      const users = await db.table('user').select('*');
      if (users) {
        return users;
      }
      console.log('error');
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
      // const user = await User.query().findById(userId);
      const user = await context.users.load(userId);
      if (user) {
        return user;
      }
      console.log('error');
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
    async resolve(_, { username }, context) {
      const user = await User.getUserByUsername(username);
      if (user) {
        return user;
      }
      console.log('error');
    },
  },
  getCurrentUser: {
    type: UserType,
    description: 'Given an auth token, return the user and auth token',
    async resolve(_, args, context) {
      // const userId = requireAuth(authToken);
      const user = await User.query().findById(context.user.id);
      if (!user) {
        console.log('error');
      }
      return user;
    },
  },
};
