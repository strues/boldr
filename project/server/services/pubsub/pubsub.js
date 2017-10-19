import { RedisPubSub } from 'graphql-redis-subscriptions';
import { createClient } from '../redis';

/**
 * getPubSubClient returns the pubsub singleton
 */
let pubsub = null;
const getPubSubClient = () => {
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

export default getPubSubClient;
