import redisClient from './redis';
import knex from './postgres';
import mailer from './mailer';
import s3 from './aws';
import {
  isAuthenticated,
  signToken,
  configureJwt,
  configureLocal,
} from './authentication';

export {
  redisClient,
  knex,
  mailer,
  s3,
  isAuthenticated,
  signToken,
  configureJwt,
  configureLocal,
};
