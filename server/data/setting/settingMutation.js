import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLString } from 'graphql';
import Setting from '../../models/Setting';
import SettingType, { SettingInput } from './settingType';

export default {
  editSetting: {
    type: SettingType,
    description: 'creating a new tag',
    args: {
      id: {
        type: GraphQLInt,
      },
      input: {
        type: new GraphQLNonNull(SettingInput),
      },
    },
    async resolve(_, args, context) {
      // await Article.query().patchAndFetchById(args.id, {
      const payload = await Setting.query().saveAndFetch(args.input);
      return payload;
    },
  },
};
