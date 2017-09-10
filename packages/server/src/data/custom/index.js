import Module from '../connector';
import schema from './schema.graphql';
import createResolvers from './resolvers';

export default new Module({ schema, createResolversFn: createResolvers });
