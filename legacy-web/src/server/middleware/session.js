/**
 * Session Middleware
 * src/middleware/session
 */

import session from 'express-session';

import { mainRedisClient } from '../services/redis';
import config from '../config';

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

const RedisStore = require('connect-redis')(session);
const env = process.env.NODE_ENV || 'development';
const sessionOptions = {
  secret: config.token.secret,
  name: 'boldr:sid',
  httpOnly: true,
  rolling: true,
  saveUninitialized: true,
  resave: true,
  unset: 'destroy',
  cookie: {
    secure: false,
    maxAge: ONE_WEEK,
  },
  store: new RedisStore({
    client: mainRedisClient,
  }),
};
if (env === 'production') {
  // Enable the secure cookie when we are in production mode.
  sessionOptions.cookie.secure = true;
}
const sessionMiddleware = session(sessionOptions);

export default sessionMiddleware;
