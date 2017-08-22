import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} from 'graphql';
import { GraphQLEmail, GraphQLURL, GraphQLDateTime } from '../scalars';
import { dateCUD } from '../field/date';
import { globalIdField } from '../field/identifier';
import User from '../../models/User';
import ArticleType from './article';
import SocialType from './social';
import RoleType from './role';
import MediaType from './media';
import FileType from './file';
import VerificationTokenType from './verificationToken';
import ResetTokenType from './resetToken';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'The user or account',
  fields: () => ({
    id: globalIdField(),
    ...dateCUD,
    email: {
      type: new GraphQLNonNull(GraphQLEmail),
      description: 'The user email',
    },
    username: {
      type: GraphQLString,
      description: 'The username of the user',
    },
    verified: {
      type: GraphQLBoolean,
      description: 'true if email is verified, false otherwise',
    },
    website: {
      type: GraphQLURL,
      description: 'The website of the user',
    },
    firstName: {
      type: GraphQLString,
      description: 'The first name of the user',
    },
    lastName: {
      type: GraphQLString,
      description: 'The last name associated with the user',
    },
    bio: {
      type: GraphQLString,
      description: 'Information about the user',
    },
    avatarUrl: {
      type: GraphQLURL,
      description: "url of user's avatar picture",
    },
    profileImage: {
      type: GraphQLURL,
      description: "Url for the user's profile background image",
    },
    location: {
      type: GraphQLString,
      description: 'Location the user lives',
    },
    language: {
      type: GraphQLString,
      description: 'Language the user prefers',
    },
    birthday: {
      type: GraphQLDateTime,
      description: 'When the user was born',
    },
    roles: {
      type: new GraphQLList(RoleType),
      description: 'Roles the user belongs to.',
      // eslint-disable-next-line
      resolve(user, args, ctx) {
        return User.query().findById(user.id).then(result => result.$relatedQuery('roles'));
      },
    },
    socialMedia: {
      type: SocialType,
      description: 'Social media profiles of the user.',
      // eslint-disable-next-line
      resolve(user, args, ctx) {
        return User.query().findById(user.id).then(result => result.$relatedQuery('socialMedia'));
      },
    },
    articles: {
      type: new GraphQLList(ArticleType),
      description: 'Articles the user has written',
      // eslint-disable-next-line
      resolve(user, args, ctx) {
        return User.query().findById(user.id).then(result => result.$relatedQuery('articles'));
      },
    },
    uploads: {
      type: new GraphQLList(MediaType),
      description: 'Articles the user has written',
      // eslint-disable-next-line
      resolve(user, args, ctx) {
        return User.query().findById(user.id).then(result => result.$relatedQuery('uploads'));
      },
    },
    verificationToken: {
      type: VerificationTokenType,
      description: 'Account verification token belonging to the user.',
      // eslint-disable-next-line
      resolve(user, args, ctx) {
        return User.query()
          .findById(user.id)
          .then(result => result.$relatedQuery('verificationToken'));
      },
    },
    resetToken: {
      type: ResetTokenType,
      description: 'Password reset token belonging to the user.',
      // eslint-disable-next-line
      resolve(user, args, ctx) {
        return User.query().findById(user.id).then(result => result.$relatedQuery('resetToken'));
      },
    },
  }),
});

export default UserType;
