import Redis from 'ioredis';
import logger from '../logger';
import { config } from '../../config';

const redisClient = new Redis(config.get('redis.url'));
const pubSubClient = new Redis(config.get('redis.url'));

function destroyRedis() {
  redisClient.disconnect();
  pubSubClient.disconnect();
}

redisClient.on('connect', () => {
  logger.info(`Redis connected on ${config.get('redis.url')}`);
});

redisClient.on('error', err => {
  logger.error(`Error while connecting to Redis!!! ${err}`);
  process.exit(1);
});

redisClient.on('close', () => {
  logger.warn('Redis connection has been closed.');
  process.exit(1);
});

redisClient.on('reconnecting', () => {
  logger.info('Redis is attempting to re-connect');
});

redisClient.on('+node', data => {
  logger.info(data, 'node is connected');
});

export { redisClient, pubSubClient, destroyRedis };
