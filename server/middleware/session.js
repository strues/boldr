/**
 * Session Middleware
 * src/core/middleware/session
 */

import session from 'express-session';
import redisClient from '../services/redis';
import getConfig from '../../config/get';

const RedisStore = require('connect-redis')(session);

const env = getConfig('env') || 'development';

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: getConfig('token.secret'),
  name: 'boldr:sid',
  proxy: true,
  resave: false,
  saveUninitialized: false,
  unset: 'destroy',
});

export default sessionMiddleware;
