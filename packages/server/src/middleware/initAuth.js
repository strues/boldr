/**
 * Authentication Middleware
 * server/middleware/initAuth
 */
import jwt from 'jsonwebtoken';
import session from 'express-session';
import connectRedis from 'connect-redis';
import getConfig from '@boldr/config';
import { redisClient } from '../services/redis';
import User from '../models/User';
import rbac from './rbac';

const config = getConfig();

const env = process.env.NODE_ENV || 'development';
const sessionOptions = {
  secret: config.server.token.secret,
  name: 'boldr:sid',
  httpOnly: true,
  rolling: true,
  saveUninitialized: true,
  resave: true,
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

      const user = await User.query()
        .findById(payload.subject)
        .eager('roles')
        .skipUndefined();
      req.session.user = user;
      req.user = user;
      req.user.role = user.roles[0].name;
      return next();
    }
  });
  app.use(rbac());
}
