import { GraphQLSchema } from 'graphql';

import RootQueryType from './rootQuery';
import RootMutationType from './rootMutation';
// import RootSubscription from './rootSubscription';

export default new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
