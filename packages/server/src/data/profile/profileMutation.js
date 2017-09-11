import { GraphQLID, GraphQLNonNull, GraphQLError } from 'graphql';
import Profile from '../../models/Profile';
import EditProfileInput from '../../schema/input/editProfile';
import ProfileType from '../../schema/type/profile';

export default {
  editProfile: {
    type: ProfileType,
    description: 'Edit an existing user',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The profile id',
      },
      input: {
        type: new GraphQLNonNull(EditProfileInput),
        description: 'Fields available for editing a profile.',
      },
    },
    // eslint-disable-next-line
    async resolve(obj, args, context) {
      const updatedUser = await Profile.query().patchAndFetchById(args.id, {
        firstName: args.input.firstName,
        lastName: args.input.lastName,
        bio: args.input.bio,
        location: args.input.location,
      });
      return updatedUser;
    },
  },
};
