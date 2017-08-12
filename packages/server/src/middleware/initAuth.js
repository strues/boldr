/**
 * Authentication Middleware
 * server/middleware/initAuth
 */
import jwt from 'jsonwebtoken';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { mainRedisClient } from '../services/redis';
import User from '../models/User';
import { config } from '../config';
import rbac from './rbac';

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

const env = process.env.NODE_ENV || 'development';
const sessionOptions = {
  secret: config.get('token.secret'),
  name: 'boldr:sid',
  httpOnly: true,
  rolling: true,
  saveUninitialized: true,
  resave: true,
  unset: 'destroy',
  cookie: {
    secure: false,
    maxAge: ONE_WEEK,
  },
  store: new (connectRedis(session))({ client: mainRedisClient }),
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
    req.isAuthenticated = () => {
      const token = fromHeaderOrQuerystring(req);
      try {
        return jwt.verify(token, config.get('token.secret'));
        // eslint-disable-next-line
      } catch (err) {
        return false;
      }
    };
    if (!req.isAuthenticated()) {
      next();
    } else {
      const payload = req.isAuthenticated();

      const user = await User.query().findById(payload.subject).eager('roles').skipUndefined();
      req.session.user = user;
      req.user = user;
      req.user.role = user.roles[0].name;
      next();
    }
  });
  app.use(rbac());
}
