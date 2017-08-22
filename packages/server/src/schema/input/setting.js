import { GraphQLString, GraphQLNonNull, GraphQLInputObjectType } from 'graphql';

const SettingInput = new GraphQLInputObjectType({
  name: 'SettingInput',
  fields: () => ({
    key: {
      type: GraphQLString,
      description: 'The setting option',
    },
    value: {
      type: GraphQLString,
      description: 'The value of the setting',
    },
    label: {
      type: GraphQLString,
      description: 'A non-normalized key',
    },
    description: {
      type: GraphQLString,
      description: 'The description for what the setting does.',
    },
  }),
});

export default SettingInput;
