import Redis from 'ioredis';
import bluebird from 'bluebird';
import logger from '../core/logger';

const config = require('../config/config');

const redisConfig = config.get('redis');

bluebird.promisifyAll(Redis);

const redisClient = new Redis(redisConfig.uri || process.env.REDIS_CONN_URI);

redisClient.on('connect', () => {
  logger.info('Redis connection has been established!');
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

redisClient.on('+node', (data) => {
  logger.info(data, 'node is connected');
});

export default redisClient;
