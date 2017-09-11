import { GraphQLString, GraphQLObjectType, GraphQLID } from 'graphql';
import { GraphQLURL, GraphQLDateTime } from '../scalars';
import { dateCUD } from '../field/date';
import { globalIdField } from '../field/identifier';
import Profile from '../../models/Profile';
import SocialType from './social';

const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  description:
    'The profile belonging to an account displays information such as username or a bio.',
  fields: () => ({
    id: globalIdField(),
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
      description: 'The url for an avatar',
    },
    profileImage: {
      type: GraphQLURL,
      description: 'A url for an image to use as a profile background.',
    },
    location: {
      type: GraphQLString,
      description: 'Where the user lives',
    },
    language: {
      type: GraphQLString,
      description: 'Language the user prefers',
    },
    birthday: {
      type: GraphQLDateTime,
      description: 'When the user was born',
    },
    ...dateCUD,

    socialMedia: {
      type: SocialType,
      description: 'Social media profiles.',
      // eslint-disable-next-line
      resolve(obj, args, ctx) {
        return Profile.query()
          .findById(obj.id)
          .then(result => result.$relatedQuery('socialMedia'));
      },
    },
  }),
});

export default ProfileType;
