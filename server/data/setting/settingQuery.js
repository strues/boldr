import { GraphQLList } from 'graphql';
import Setting from '../../models/Setting';
import SettingType from './settingType';

export default {
  getSettings: {
    type: new GraphQLList(SettingType),
    description: 'A query for a listing of all settings',
    async resolve(_, { limit, offset }, context) {
      const settings = await Setting.query().returning('*');
      if (!settings) {
        console.log('error');
      }

      return settings;
    },
  },
};
