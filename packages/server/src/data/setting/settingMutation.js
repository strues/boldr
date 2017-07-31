import { GraphQLNonNull, GraphQLID } from 'graphql';
import Setting from '../../models/Setting';
import SettingType, { SettingInput } from './settingType';

export default {
  editSetting: {
    type: SettingType,
    description: 'creating a new tag',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
      input: {
        type: new GraphQLNonNull(SettingInput),
      },
    },
    async resolve(_, { id, input }, context) {
      const payload = await Setting.query().findById(id).patchAndFetch(input);
      return payload;
    },
  },
};
