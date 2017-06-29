import { GraphQLSchema } from 'graphql';

import RootQueryType from './rootQuery';
import RootMutationType from './rootMutation';

const RootSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

export default RootSchema;
