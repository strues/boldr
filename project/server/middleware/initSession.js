/**
 * @module initSession
 * Session Middleware
 * server/middleware/initSession
 *
 */
import session from 'express-session';
import config from '@boldr/config';
import { createClient } from '../services/redis';
/**
 * Initialize the session middleware
 *
 * @export
 * @param {any} app the Express app/server object
 */
export default function initSession(app) {
  const env = process.env.NODE_ENV || 'development';
  // Configure Express Session options
  const sessionOptions = {
    secret: config.get('token.secret'),
    name: config.get('session.name'),
    httpOnly: config.get('session.httOnly'),
    rolling: config.get('session.rolling'),
    saveUninitialized: config.get('session.saveUninitialized'),
    resave: config.get('session.resave'),
    unset: config.get('session.unset'),
    cookie: {
      secure: false,
      maxAge: config.get('token.expiration'),
    },
    store: new (require('connect-redis')(session))({ client: createClient() }),
  };

  if (env === 'production') {
    // Enable the secure cookie when we are in production mode.
    sessionOptions.cookie.secure = true;
  }

  app.use(session(sessionOptions));
}
