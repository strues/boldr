/**
 * Session Middleware
 * src/middleware/session
 */

import session from 'express-session';
import redisClient from '../services/redis';
import config from '../config';

const RedisStore = require('connect-redis')(session);

const env = config.get('env') || 'development';

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: config.get('token.secret'),
  name: 'boldr:sid',
  resave: false,
  saveUninitialized: false,
  unset: 'destroy',
});

export default sessionMiddleware;
