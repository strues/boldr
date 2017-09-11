import { GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql';
import ErrorType from './error';
import AccountType from './account';

export const AccountLoginResponse = new GraphQLObjectType({
  name: 'AccountLoginResponse',
  fields: () => ({
    token: {
      type: GraphQLString,
      description: 'The JSONWebToken for the user.',
    },
    account: {
      type: AccountType,
      description: 'The user who logged in.',
    },
    errors: {
      type: new GraphQLList(ErrorType),
      description: 'Any auth related errors.',
    },
  }),
});
