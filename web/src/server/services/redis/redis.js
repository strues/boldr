/* @flow */

import Redis from 'ioredis';
import logger from '../logger';

const mainRedisClient = new Redis(process.env.REDIS_URL);
const pubSubRedisClient = new Redis(process.env.REDIS_URL);

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
