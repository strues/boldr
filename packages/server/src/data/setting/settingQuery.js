import { GraphQLList } from 'graphql';
import Setting from '../../models/Setting';
import { errorObj } from '../../errors';
import SettingType from './settingType';

export default {
  settings: {
    type: new GraphQLList(SettingType),
    description: 'A query for a listing of all settings',
    async resolve() {
      const settings = await Setting.query().returning('*');
      if (!settings) {
        throw errorObj({ _error: 'Unable to find settings.' });
      }

      return settings;
    },
  },
};
