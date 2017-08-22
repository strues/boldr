import { GraphQLString, GraphQLObjectType } from 'graphql';
import { GraphQLURL } from '../scalars';
import { globalIdField } from '../field/identifier';

const SettingType = new GraphQLObjectType({
  name: 'Setting',
  description: 'Editable site settings',
  fields: () => ({
    id: globalIdField(),
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

export default SettingType;
