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
import Profile from '../../models/Profile';
import SocialType from './social';

const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  description: 'The profile belonging to an account.',
  fields: () => ({
    id: globalIdField(),
    ...dateCUD,
    accountId: {
      type: GraphQLID,
      description: 'The id of the account the profile belongs to.',
    },
    username: {
      type: GraphQLString,
      description: 'The username of the user',
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
    socialMedia: {
      type: SocialType,
      description: 'Social media profiles of the user.',
      // eslint-disable-next-line
      resolve(root, args, ctx) {
        return Profile.query()
          .findById(root.id)
          .then(result => result.$relatedQuery('socialMedia'));
      },
    },
  }),
});

export default ProfileType;
