/**
 * Authentication Middleware
 * server/middleware/auth
 */
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config';
import sessionMiddleware from './session';
import rbac from './rbac';

const debug = require('debug')('boldrAPI:authMW');

export default app => {
  app.use(sessionMiddleware);
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
      const user = await User.query().findById(payload.sub).eager('[roles]');
      req.session.user = user;
      req.user = user;
      req.user.role = user.roles[0].name;
      next();
    }
  });
  app.use(rbac());
};
