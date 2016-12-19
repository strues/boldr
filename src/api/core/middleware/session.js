/**
 * Session Middleware
 * src/core/middleware/session
 */

import session from 'express-session';
import redisClient from '../../services/redis';
import config from '../../../../config/private/api';

const RedisStore = require('connect-redis')(session);

const env = config.env || 'development';

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: config.token.secret,
  name: 'boldr:sid',
  proxy: true,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: env !== 'development'
    && env !== 'test',
    maxAge: 3600000, //60 min
  },
  unset: 'destroy',
});

export default sessionMiddleware;
