/* eslint-disable no-unused-vars */
import _debug from 'debug';
import { errorObj } from '../../errors';

const debug = _debug('boldr:server:graphql:resolvers:profile');

const profileResolvers = {
  Profile: {
    socialMedia: async (obj, args, ctx) => {
      const socialMedia = await ctx.models.Profile
        .query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('socialMedia'));
      if (!socialMedia) {
        throw errorObj({ _error: 'Unable to find social media associated with the profile id.' });
      }
      return socialMedia;
    },
  },
  Query: {
    profile: async (obj, { id, accountId, username }, ctx) => {
      let profile;
      if (id) {
        profile = await ctx.profiles.load(id);
        return profile;
      } else if (username) {
        profile = await ctx.models.Profile
          .query()
          .where({ username })
          .first();
        return profile;
      } else if (accountId) {
        profile = await ctx.models.Profile
          .query()
          // eslint-disable-next-line camelcase
          .where({ account_id: accountId })
          .first();
        return profile;
      }

      throw errorObj({ _error: 'Unable to find a profile with that id.' });
    },
  },
  Mutation: {
    editProfile: async (obj, args, ctx) => {
      const updatedProfile = await ctx.models.Profile.query().patchAndFetchById(args.id, {
        firstName: args.input.firstName,
        lastName: args.input.lastName,
        bio: args.input.bio,
        location: args.input.location,
      });
      return updatedProfile;
    },
  },
};

export default profileResolvers;
