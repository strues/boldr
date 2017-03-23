/* @flow */
require('dotenv').config();

import url from 'url';
import Redis from 'ioredis';
import bluebird from 'bluebird';
import logger from '../logger';

// $FlowIssue
const redisCon = url.parse(process.env.REDIS_URI);
// $FlowIssue
const hostAddr = redisCon.host.split(':');
const redisClient = new Redis({
  port: redisCon.port,
  host: hostAddr[0],
  db: 0,
});

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

redisClient.on('+node', data => {
  logger.info(data, 'node is connected');
});

export default redisClient;
