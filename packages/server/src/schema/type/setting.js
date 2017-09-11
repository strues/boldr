import { GraphQLString, GraphQLObjectType } from 'graphql';
import { globalIdField } from '../field/identifier';

const SettingType = new GraphQLObjectType({
  name: 'Setting',
  description: 'Editable site settings',
  fields: () => ({
    id: globalIdField(),
    key: {
      type: GraphQLString,
      description: 'The option or setting identifier',
    },
    value: {
      type: GraphQLString,
      description: 'The value of the setting',
    },
    label: {
      type: GraphQLString,
      description: 'A non-normalized key.',
    },
    description: {
      type: GraphQLString,
      description: 'Explaination of what the setting does.',
    },
  }),
});

export default SettingType;
