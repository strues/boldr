/* eslint-disable no-unused-vars */
import _debug from 'debug';
import { errorObj } from '../../errors';
import slugIt from '../../utils/slugIt';

const settingResolvers = {
  Query: {
    settings: async (obj, args, ctx) => {
      const settings = await ctx.models.Setting.query().returning('*');
      if (!settings) {
        throw errorObj({ _error: 'Unable to find settings.' });
      }

      return settings;
    },
  },
  Mutation: {
    editSetting: async (obj, { id, input }, ctx) => {
      const payload = await ctx.models.Setting
        .query()
        .findById(id)
        .patchAndFetch(input);
      return payload;
    },
  },
};

export default settingResolvers;
