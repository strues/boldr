/**
 * Authentication Middleware
 * server/middleware/initAuth
 */
import jwt from 'jsonwebtoken';
import session from 'express-session';
import connectRedis from 'connect-redis';
import getConfig from '@boldr/config';
import { redisClient } from '../services/redis';
import Account from '../models/Account';
import rbac from './rbac';

const config = getConfig();

const env = process.env.NODE_ENV || 'development';
// Configure Express Session options
const sessionOptions = {
  secret: config.server.token.secret,
  name: 'boldr:sid',
  httpOnly: true,
  rolling: true,
  saveUninitialized: true,
  resave: false,
  unset: 'destroy',
  cookie: {
    secure: false,
    maxAge: config.server.token.expiration,
  },
  store: new (connectRedis(session))({ client: redisClient }),
};
if (env === 'production') {
  // Enable the secure cookie when we are in production mode.
  sessionOptions.cookie.secure = true;
}

/**
 * Extracts a JWT from a request header or query string
 * @param  {Object} req the request object
 * @return {string}     the token
 */
function fromHeaderOrQuerystring(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

export default function initAuth(app) {
  app.use(session(sessionOptions));

  app.use(async (req, res, next) => {
    req.isAuthenticated = async () => {
      const token = fromHeaderOrQuerystring(req);
      try {
        await jwt.verify(token, config.server.token.secret);
        return true;
      } catch (err) {
        return false;
      }
    };
    if (!req.isAuthenticated()) {
      return next();
    } else {
      const payload = req.isAuthenticated();

      const account = await Account.query()
        .findById(payload.subject)
        .eager('[roles,profile]')
        .skipUndefined();
      req.session.user = account;
      req.user = account;
      req.user.role = account.roles[0].name;
      return next();
    }
  });
  app.use(rbac());
}
