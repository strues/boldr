import { GraphQLNonNull, GraphQLID } from 'graphql';
import Setting from '../../models/Setting';
import SettingInput from '../../schema/input/setting';
import SettingType from '../../schema/type/setting';

export default {
  editSetting: {
    type: SettingType,
    description: 'Modify the value of the site setting',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
      input: {
        type: new GraphQLNonNull(SettingInput),
      },
    },
    async resolve(obj, { id, input }) {
      const payload = await Setting.query()
        .findById(id)
        .patchAndFetch(input);
      return payload;
    },
  },
};
