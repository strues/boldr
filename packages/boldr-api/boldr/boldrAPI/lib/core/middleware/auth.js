'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _authentication = require('../../services/authentication');

var _user = require('../../routes/user/user.model');

var _user2 = _interopRequireDefault(_user);

var _session = require('./session');

var _session2 = _interopRequireDefault(_session);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Authentication Middleware
 * src/core/middleware/auth
 *
 * Depends on session middleware
 */

var debug = require('debug')('boldrAPI:authMW');

exports.default = function (app) {
  _passport2.default.serializeUser(function (user, done) {
    var sessionUser = { id: user.id, email: user.email };
    debug('serialize', sessionUser);
    return done(null, sessionUser);
  });

  _passport2.default.deserializeUser(function (sessionUser, done) {
    if (!sessionUser) {
      return done();
    }
    debug('deserialize', sessionUser);
    done(null, sessionUser);
  });

  (0, _authentication.configureLocal)(_user2.default);
  (0, _authentication.configureJwt)(_user2.default);
  app.use(_session2.default);
  app.use(_passport2.default.initialize());
  app.use(_passport2.default.session());
  /* istanbul ignore next */
  app.use(function (req, res, next) {
    // This makes the user object and the roles associated with the user
    // available at res.locals.user
    _passport2.default.authenticate('jwt', function (err, user) {
      res.locals.user = !!user ? user : null;

      return next();
    })(req, res, next);
  });
};