import { GraphQLID, GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { comparePassword } from '../../services/hashing';
import signToken from '../../services/authentication/signToken';
import User from '../../models/User';
import {
  UserLoginInput,
  UserLoginResponse,
  AuthError,
} from './auth/userAuthTypes';
import UserType from './userType';

export default {
  loginUser: {
    type: UserLoginResponse,
    description: 'for troubleshooting by admins, create a JWT for a given userId',
    args: {
      user: {
        type: new GraphQLNonNull(UserLoginInput),
      },
    },
    async resolve(_, args, context) {
      const user = await User.query()
        .where({ email: args.user.email })
        .eager('[roles,socialMedia]')
        .first();

      const validAuth = await user.authenticate(args.user.password);
      // remove the password from the response.
      user.stripPassword();
      // sign the token
      const token = signToken(user);
      context.req.user = user;
      const payload = {
        token,
        user,
      };
      return payload;
    },
  },
};
