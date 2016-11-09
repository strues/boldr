/**
 * Session Middleware
 * src/core/middleware/session
 */

import session from 'express-session';
import redisClient from '../../db/redis';

const RedisStore = require('connect-redis')(session);
const config = require('../../config/config');

const sessionConfig = config.get('session');
const env = config.get('node_env') || 'development';

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: sessionConfig.secret,
  name: 'boldr:sid',
  proxy: true,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: env !== 'development'
    && env !== 'test',
    maxAge: 2419200000,
  },
  unset: 'destroy',
});

export default sessionMiddleware;
