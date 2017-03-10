/**
 * Session Middleware
 * server/middleware/session
 */

import session from 'express-session';
import redisClient from '../services/redis';
import config from '../../../config';

const RedisStore = require('connect-redis')(session);

const env = config('env') || 'development';

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: config('token.secret'),
  name: 'boldr:sid',
  resave: false,
  saveUninitialized: false,
  unset: 'destroy',
});

export default sessionMiddleware;
