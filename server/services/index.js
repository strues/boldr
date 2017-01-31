import redisClient from './redis';
import knex from './postgres';
import mailer from './mailer';
import { isAuthenticated, signToken } from './authentication';

export {
  redisClient,
  knex,
  mailer,
  isAuthenticated,
  signToken,
};
