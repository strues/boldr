import { GraphQLString, GraphQLObjectType, GraphQLInt } from 'graphql';

const ErrorType = new GraphQLObjectType({
  name: 'Error',
  fields: () => ({
    code: {
      type: GraphQLInt,
      description: 'HTTP status code',
    },
    message: {
      type: GraphQLString,
      description: 'The error message',
    },
  }),
});

export default ErrorType;
