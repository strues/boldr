/**
 * Session Middleware
 * src/core/middleware/session
 */

import session from 'express-session';
import conf from '../../config/config';
import redisClient from '../../db/redis';

const RedisStore = require('connect-redis')(session);

const env = conf.get('env') || 'development';

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: conf.get('session.secret'),
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
