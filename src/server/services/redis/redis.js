/* @flow */
import url from 'url';
import Redis from 'ioredis';
import bluebird from 'bluebird';
import logger from '../logger';
import config from '../../config';

const redisCon = url.parse(config.redis.url);
// $FlowIssue
const hostAddr = redisCon.host.split(':');
export const redisOptions = {
  port: redisCon.port,
  host: redisCon.hostname,
  db: process.env.NODE_ENV === 'test' ? 1 : 0,
  // eslint-disable-next-line
  retry_strategy:(options) => {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands
      // with a individual error
      return new Error('The server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all
      // commands with a individual error
      return new Error('Retry time exhausted');
    }

    if (options.times_connected > 10) {
      // End reconnecting with built in error
      return undefined;
    }

    // reconnect after
    return Math.max(options.attempt * 100, 3000);
  },
};

const mainRedisClient = new Redis(redisOptions);
const pubSubRedisClient = new Redis(redisOptions);

function destroyRedis() {
  mainRedisClient.disconnect();
  pubSubRedisClient.disconnect();
}

mainRedisClient.on('connect', () => {
  logger.info('Redis connection has been established!');
});

mainRedisClient.on('error', err => {
  logger.error(`Error while connecting to Redis!!! ${err}`);
  process.exit(1);
});

mainRedisClient.on('close', () => {
  logger.warn('Redis connection has been closed.');
  process.exit(1);
});

mainRedisClient.on('reconnecting', () => {
  logger.info('Redis is attempting to re-connect');
});

mainRedisClient.on('+node', data => {
  logger.info(data, 'node is connected');
});

export { mainRedisClient, pubSubRedisClient, destroyRedis };
