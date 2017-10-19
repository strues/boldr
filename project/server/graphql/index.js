import formatGqlError from './formatGqlError';
import schema from './schema';
import { createSubscriptionManager } from './subscriptions';
import Context from './context';

module.exports = {
  createGraphOptions: req => ({
    // Schema is created already, so just include it.
    schema,

    // Load in the new context here, this'll create the loaders + mutators for
    // the lifespan of this request.
    context: new Context(req),
    formatError: formatGqlError,
    debug: process.env.NODE_ENV !== 'production',
    pretty: process.env.NODE_ENV !== 'production',
  }),
  createSubscriptionManager,
};
