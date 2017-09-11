import { GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql';
import { GraphQLURL } from '../scalars';
import { globalIdField, uuid, name } from '../field/identifier';
import { dateCUD } from '../field/date';
import AccountType from './account';

const RoleType = new GraphQLObjectType({
  name: 'Role',
  description: 'Restrict access to content or areas of your site using a role.',
  fields: () => ({
    id: globalIdField(),
    ...uuid,
    ...name,
    image: {
      type: GraphQLURL,
      description: 'An image for role identification',
    },
    description: {
      type: GraphQLString,
      description: 'The role description',
    },
    accounts: {
      type: new GraphQLList(AccountType),
      description: 'Accounts belonging to a role.',
    },
    ...dateCUD,
  }),
});

export default RoleType;
