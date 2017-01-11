/**
 * Authentication Middleware
 * src/core/middleware/auth
 *
 * Depends on session middleware
 */

import passport from 'passport';
import { configureJwt, configureLocal } from '../../services/authentication';
import User from '../../routes/user/user.model';
import sessionMiddleware from './session';

const debug = require('debug')('boldrAPI:authMW');

export default (app) => {
  passport.serializeUser((user, done) => {
    const sessionUser = { id: user.id, email: user.email };
    debug('serialize', sessionUser);
    return done(null, sessionUser);
  });

  passport.deserializeUser((sessionUser, done) => {
    if (!sessionUser) {
      return done();
    }
    debug('deserialize', sessionUser);
    done(null, sessionUser);
  });

  configureLocal(User);
  configureJwt(User);
  app.use(sessionMiddleware);
  app.use(passport.initialize());
  app.use(passport.session());
/* istanbul ignore next */
  app.use((req, res, next) => {
    // This makes the user object and the roles associated with the user
    // available at res.locals.user
    passport.authenticate('jwt', (user) => {
      res.locals.user = !!user ? user : null;

      return next();
    })(req, res, next);
  });
};
