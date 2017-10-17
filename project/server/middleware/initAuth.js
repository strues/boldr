/**
 * @module initAuth
 * Authentication Middleware
 * server/middleware/initAuth
 *
 */
import session from 'express-session';
import connectRedis from 'connect-redis';
import config from '@boldr/config';
import { createClient } from '../services/redis';
import authService from '../services/authentication/authService';
import rbac from './rbac';

/**
 * Initialize the session and authentication middleware.
 *
 * @export
 * @param {any} app the Express app/server object
 */
export default function initAuth(app) {
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
      maxAge: config.get('token.expiration'),
    },
    store: new (connectRedis(session))({ client: createClient() }),
  };

  if (env === 'production') {
    // Enable the secure cookie when we are in production mode.
    sessionOptions.cookie.secure = true;
  }

  app.use(session(sessionOptions));

  app.use(authService);
  app.use(rbac());
}
