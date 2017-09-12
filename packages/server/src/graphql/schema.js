import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
