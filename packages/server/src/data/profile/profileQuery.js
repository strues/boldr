import { GraphQLString, GraphQLID } from 'graphql';
import Profile from '../../models/Profile';
import { errorObj } from '../../errors';
import ProfileType from '../../schema/type/profile';

export default {
  profile: {
    type: ProfileType,
    description: 'A query for admin to find a user by their id',
    args: {
      id: {
        type: GraphQLID,
        description: 'The id of the profile to query',
      },
      accountId: {
        type: GraphQLID,
        description: 'The id of the account the profile belongs to.',
      },
      username: {
        type: GraphQLString,
        description: 'The username of the profile to find',
      },
    },
    async resolve(obj, { id, accountId, username }, context) {
      let profile;
      if (id) {
        profile = await context.profiles.load(id);
        return profile;
      } else if (username) {
        profile = await Profile.query()
          .where({ username })
          .first();
        return profile;
      } else if (accountId) {
        profile = await Profile.query()
          // eslint-disable-next-line camelcase
          .where({ account_id: accountId })
          .first();
        return profile;
      }

      throw errorObj({ _error: 'Unable to find a user with that id.' });
    },
  },
};
