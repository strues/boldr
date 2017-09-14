/**
 * Authentication Middleware
 * server/middleware/initAuth
 */
import session from 'express-session';
import connectRedis from 'connect-redis';
import { config } from '@boldr/config';
import { createClient } from '../services/redis';
import authentication from '../services/authentication/authentication';
import rbac from './rbac';

const env = process.env.NODE_ENV || 'development';
// Configure Express Session options
const sessionOptions = {
  secret: config.get('token.secret'),
  name: 'boldr:sid',
  httpOnly: true,
  rolling: true,
  saveUninitialized: true,
  resave: false,
  unset: 'destroy',
  cookie: {
    secure: false,
    maxAge: 604800000,
  },
  store: new (connectRedis(session))({ client: createClient() }),
};
if (env === 'production') {
  // Enable the secure cookie when we are in production mode.
  sessionOptions.cookie.secure = true;
}

export default function initAuth(app) {
  app.use(session(sessionOptions));

  app.use(authentication);
  app.use(rbac());
}
