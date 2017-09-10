import { GraphQLID, GraphQLNonNull, GraphQLError } from 'graphql';
import uuid from 'uuid';
import { mailer, signToken } from '../../services';
import { welcomeEmail } from '../../services/mailer/templates';
import User from '../../models/User';
import { UserLoginResponse } from '../../schema/type/auth';
import { UserLoginInput, UserSignupInput } from '../../schema/input/auth';
import EditUserInput from '../../schema/input/editUser';
import UserType from '../../schema/type/user';

export default {
  loginUser: {
    type: UserLoginResponse,
    description: 'Authenticates a user. Returns the user and a signed JWT.',
    args: {
      input: {
        type: new GraphQLNonNull(UserLoginInput),
      },
    },
    async resolve(root, { input }, context) {
      const user = await User.query()
        .where({ email: input.email })
        .eager('[roles,socialMedia]')
        .first();

      if (!user || !await user.authenticate(input.password)) {
        throw new GraphQLError('Incorrect email and/or password.');
      }

      // remove the password from the response.
      user.stripPassword();
      // sign the token
      const token = await signToken(user);
      context.req.user = user;

      return {
        token,
        user,
      };
    },
  },
  signupUser: {
    type: UserType,
    description: 'Register for a new account.',
    args: {
      input: {
        type: new GraphQLNonNull(UserSignupInput),
      },
    },
    async resolve(root, { input }, context) {
      const checkUser = await User.query()
        .where({ email: input.email })
        .first();

      if (checkUser) {
        return new Error('The user exists');
      }

      const newUser = await User.query().insert(input);
      await newUser.$relatedQuery('roles').relate({ id: 1 });

      if (!newUser) {
        return new Error('Signup failed');
      }
      // generate user verification token to send in the email.
      const verifToken = uuid.v4();
      // get the mail template
      const mailBody = welcomeEmail(verifToken);
      // subject
      const mailSubject = 'Boldr User Verification';
      // send the welcome email
      mailer(newUser, mailBody, mailSubject);
      // create a relationship between the user and the token
      await newUser.$relatedQuery('verificationToken').insert({
        ip: context.req.ip,
        token: verifToken,
        userId: newUser.id,
      });
      return newUser;
    },
  },
  editUser: {
    type: UserType,
    description: 'Edit an existing user',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The user id',
      },
      input: {
        type: new GraphQLNonNull(EditUserInput),
        description: 'The required fields for editing a user.',
      },
    },
    // eslint-disable-next-line
    async resolve(_, args, context) {
      const updatedUser = await User.query().patchAndFetchById(args.id, {
        firstName: args.input.firstName,
        lastName: args.input.lastName,
        bio: args.input.bio,
        email: args.input.email,
        location: args.input.location,
      });
      return updatedUser;
    },
  },
};
