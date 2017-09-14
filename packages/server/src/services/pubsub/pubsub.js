import { RedisPubSub } from 'graphql-redis-subscriptions';
import { createClient } from '../redis';

/**
 * getClient returns the pubsub singleton for this instance.
 */
let pubsub = null;
export const getClient = () => {
  if (pubsub !== null) {
    return pubsub;
  }

  // Create the new PubSub client, we only need one per instance of Talk.
  pubsub = new RedisPubSub({
    publisher: createClient(),
    subscriber: createClient(),
  });

  return pubsub;
};
