import { GraphQLObjectType } from 'graphql';
import user from './user/userMutation';

const rootFields = Object.assign({}, user);

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => rootFields,
});

export default RootMutationType;
