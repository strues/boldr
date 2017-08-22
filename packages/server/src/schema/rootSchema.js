import { GraphQLSchema } from 'graphql';

import RootQueryType from '../data/rootQuery';
import RootMutationType from '../data/rootMutation';

const RootSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

export default RootSchema;
