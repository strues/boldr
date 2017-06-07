import { GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import jsonResult from 'boldr-utils/es/gql/jsonResult';
import {
  GraphQLEmail,
  GraphQLURL,
  GraphQLDateTime,
  GraphQLUUID,
  GraphQLJSON,
} from '../scalars';
import Setting from '../../models/Setting';
import SettingType from './settingType';

export default {
  getSettings: {
    type: new GraphQLList(SettingType),
    description: 'A query for a listing of all settings',
    async resolve(_, { limit, offset }, context) {

      const settings = await Setting.query().returning('*');
      if (settings) {
        return settings;
      }
      console.log('error');
    },
  },
};
