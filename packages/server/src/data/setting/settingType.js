import { GraphQLString, GraphQLObjectType, GraphQLID, GraphQLInputObjectType } from 'graphql';
import { GraphQLURL } from '../scalars';

const SettingType = new GraphQLObjectType({
  name: 'Setting',
  description: 'Editable site settings',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The identifier for the setting',
    },
    key: {
      type: GraphQLString,
      description: 'The setting option',
    },
    value: {
      type: GraphQLString,
      description: 'The value of the setting',
    },
    label: {
      type: GraphQLURL,
      description: 'A non-normalized key',
    },
    description: {
      type: GraphQLString,
      description: 'The description for what the setting does.',
    },
  }),
});

export const SettingInput = new GraphQLInputObjectType({
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

export default SettingType;
