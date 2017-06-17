import { GraphQLObjectType } from 'graphql';

const rootFields = Object.assign({});
const RootSubscriptionType = new GraphQLObjectType({
  name: 'RootSubscription',
  fields: () => rootFields,
});
export default RootSubscriptionType;
