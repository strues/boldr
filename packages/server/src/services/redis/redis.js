import Redis from 'ioredis';
import { config } from '@boldr/config';
import _debug from 'debug';
import logger from '../logger';

const debug = _debug('boldr:server:services:redis');

const attachMonitors = client => {
  debug('redis client init');

  client.on('connect', () => debug('redis client connected'));
  client.on('ready', () => debug('redis client ready'));
  client.on('reconnecting', () => debug('redis client connection lost, attempting to reconnect'));
  client.on('close', () => debug('redis client closed the connection'));
  client.on('end', () => debug('redis client ended'));

  // Error events.
  client.on('error', err => {
    if (err) {
      logger.error('Error connecting to redis:', err);
    }
  });
};

const connectionOptions = {
  // eslint-disable-next-line
  retry_strategy: function(options) {
    if (options.error && options.error.code !== 'ECONNREFUSED') {
      debug('retry strategy: none, an error occured');

      // End reconnecting on a specific error and flush all commands with a individual error
      return options.error;
    }
    if (options.total_retry_time > '1 min') {
      debug('retry strategy: none, exhausted retry time');

      // End reconnecting after a specific timeout and flush all commands with a individual error
      return new Error('Retry time exhausted');
    }

    if (options.attempt > 100) {
      debug('retry strategy: none, exhausted retry attempts');

      // End reconnecting with built in error
      return undefined;
    }

    // reconnect after
    const delay = Math.max(options.attempt * '500 ms', '1 sec');

    debug(`retry strategy: try to reconnect ${delay} ms from now`);

    return delay;
  },
};

export const createClient = () => {
  const client = new Redis(config.get('redis.url'), connectionOptions);

  // Attach the monitors that will print debug messages to the console.
  attachMonitors(client);

  return client;
};

export const createClientFactory = () => {
  let client = null;

  return () => {
    if (client !== null) {
      return client;
    }

    client = createClient();

    return client;
  };
};
