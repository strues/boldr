import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} from 'graphql';
import { GraphQLEmail, GraphQLURL, GraphQLDateTime, GraphQLPassword } from '../scalars';
import { dateCUD } from '../field/date';
import { globalIdField } from '../field/identifier';
import Account from '../../models/Account';
import ArticleType from './article';
import ProfileType from './profile';
import RoleType from './role';
import MediaType from './media';

const AccountType = new GraphQLObjectType({
  name: 'Account',
  description: 'An account belonging to a user.',
  fields: () => ({
    id: globalIdField(),

    email: {
      type: new GraphQLNonNull(GraphQLEmail),
      description: 'Email address belonging to the account',
    },
    verified: {
      type: GraphQLBoolean,
      description: 'true if email is verified, false otherwise',
    },
    ip: {
      type: GraphQLString,
      description: 'The ip address of the person performing the reset',
    },
    resetToken: {
      type: GraphQLString,
      description: 'The reset token',
    },
    resetTokenExp: {
      type: GraphQLDateTime,
      description: 'When the token expires.',
    },
    verificationToken: {
      type: GraphQLString,
      description: 'The account verification token',
    },
    verificationTokenExp: {
      type: GraphQLDateTime,
      description: 'When the verification expires.',
    },
    lastLogin: {
      type: GraphQLDateTime,
      description: 'When the account was last logged in to.',
    },
    ...dateCUD,
    roles: {
      type: new GraphQLList(RoleType),
      description: 'Roles the account belongs to.',
      // eslint-disable-next-line
      resolve(obj, args, ctx) {
        return Account.query()
          .findById(obj.id)
          .then(result => result.$relatedQuery('roles'));
      },
    },
    profile: {
      type: ProfileType,
      description: 'Profile belonging to the account.',
      // eslint-disable-next-line
      resolve(obj, args, ctx) {
        return Account.query()
          .findById(obj.id)
          .then(result => result.$relatedQuery('profile'));
      },
    },
    articles: {
      type: new GraphQLList(ArticleType),
      description: 'Articles the user has written',
      // eslint-disable-next-line
      resolve(obj, args, ctx) {
        return Account.query()
          .findById(obj.id)
          .then(result => result.$relatedQuery('articles'));
      },
    },
    uploads: {
      type: new GraphQLList(MediaType),
      description: 'Articles the user has written',
      // eslint-disable-next-line
      resolve(obj, args, ctx) {
        return Account.query()
          .findById(obj.id)
          .then(result => result.$relatedQuery('uploads'));
      },
    },
  }),
});

export default AccountType;
