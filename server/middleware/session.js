/**
 * Session Middleware
 * server/middleware/session
 */

import session from 'express-session';
import connectRedis from 'connect-redis';
import redisClient from '../services/redis';
import getConfig from '../../config/get';

const env = getConfig('env') || 'development';

const sessionMiddleware = session({
  store: new (connectRedis(session))({ client: redisClient }),
  secret: getConfig('token.secret'),
  name: 'sid',
  resave: true,
  saveUninitialized: true,
  unset: 'destroy',
});

export default sessionMiddleware;
