import { makeExecutableSchema, addErrorLoggingToSchema } from 'graphql-tools';

import logger from '../services/logger';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
