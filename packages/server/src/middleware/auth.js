/**
 * Authentication Middleware
 * server/middleware/auth
 */
import jwt from 'jsonwebtoken';
import _debug from 'debug';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { mainRedisClient } from '../services/redis';
import User from '../models/User';
import { config } from '../config';
import rbac from './rbac';

const debug = _debug('boldr:api:middleware:auth');

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

export default app => {
  app.use(session(sessionOptions));
  app.use(async (req, res, next) => {
    req.isAuthenticated = () => {
      const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
      try {
        return jwt.verify(token, config.get('token.secret'));
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
};
