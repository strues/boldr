import redisClient from './redis';
import db from './postgres';
import mailer from './mailer';
import { isAuthenticated, signToken } from './authentication';

export {
  redisClient,
  db,
  mailer,
  isAuthenticated,
  signToken,
};
