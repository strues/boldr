import { GraphQLString, GraphQLObjectType, GraphQLInt } from 'graphql';

const MetaType = new GraphQLObjectType({
  name: 'Meta',
  fields: () => ({
    status: {
      type: GraphQLInt,
      description: 'HTTP status code',
    },
    message: {
      type: GraphQLString,
      description: 'The error message',
    },
    offset: {
      type: GraphQLInt,
      description: 'The pagination offset.',
    },
    limit: {
      type: GraphQLInt,
      description: 'The number of results to return.',
    },
  }),
});

export default MetaType;
