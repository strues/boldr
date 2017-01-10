'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAuthentication = exports.verifyUser = exports.loginUser = exports.registerUser = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * register creates a new user in the database.
 * @param req
 * @param res
 * @returns {*}
 */
var registerUser = exports.registerUser = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
    var _this = this;

    var errors, payload, checkExisting, newUser;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Param validation
            req.assert('email', 'Email is not valid').isEmail();
            req.assert('email', 'Email cannot be blank').notEmpty();
            req.assert('password', 'Password cannot be blank').notEmpty();
            req.assert('first_name', 'First name cannot be blank').notEmpty();

            req.sanitize('email').normalizeEmail({ remove_dots: false });
            req.sanitize('first_name').trim();
            req.sanitize('last_name').trim();
            errors = req.validationErrors();

            if (!errors) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt('return', next(new _core.BadRequest(errors)));

          case 10:

            // the data for the user being created.
            payload = {
              id: (0, _uuid2.default)(),
              // no need to hash here, its taken care of on the model instance
              email: req.body.email,
              password: req.body.password,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              display_name: req.body.display_name,
              avatar_url: req.body.avatar_url
            };
            _context2.next = 13;
            return _user2.default.query().where('email', req.body.email);

          case 13:
            checkExisting = _context2.sent;

            if (!checkExisting.length) {
              _context2.next = 16;
              break;
            }

            return _context2.abrupt('return', next(new _core.Conflict()));

          case 16:
            _context2.next = 18;
            return objection.transaction(_user2.default, function () {
              var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(User) {
                var user, verificationToken, mailBody, mailSubject, verificationEmail;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return User.query().insert(payload);

                      case 2:
                        user = _context.sent;
                        _context.next = 5;
                        return user.$relatedQuery('roles').relate({ id: 1 });

                      case 5:

                        if (!user) {
                          throwNotFound();
                        }
                        // generate user verification token to send in the email.
                        _context.next = 8;
                        return (0, _core.generateHash)();

                      case 8:
                        verificationToken = _context.sent;
                        _context.next = 11;
                        return (0, _templates.welcomeEmail)(verificationToken);

                      case 11:
                        mailBody = _context.sent;

                        // subject
                        mailSubject = 'Boldr User Verification';
                        // send the welcome email

                        (0, _index.mailer)(user, mailBody, mailSubject);
                        // create a relationship between the user and the token
                        _context.next = 16;
                        return user.$relatedQuery('tokens').insert({
                          user_verification_token: verificationToken,
                          user_id: user.id
                        });

                      case 16:
                        verificationEmail = _context.sent;

                        if (verificationEmail) {
                          _context.next = 19;
                          break;
                        }

                        return _context.abrupt('return', next(new _core.InternalServer()));

                      case 19:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 18:
            newUser = _context2.sent;
            return _context2.abrupt('return', (0, _core.responseHandler)(res, 201, newUser));

          case 20:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function registerUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * login takes an email address and password, check the database, and issues a JWT.
 * @param req
 * @param res
 * @param next
 */


var loginUser = exports.loginUser = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
    var errors;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            req.assert('email', 'Email is invalid').isEmail();
            req.assert('email', 'Email cannot be blank').notEmpty();
            req.assert('password', 'Password cannot be blank').notEmpty();
            req.sanitize('email').normalizeEmail({ remove_dots: false });

            errors = req.validationErrors();

            if (!errors) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt('return', next(new _core.BadRequest(errors)));

          case 7:
            _context3.next = 9;
            return _user2.default.query().where({ email: req.body.email }).eager('[roles]').first();

          case 9:
            _passport2.default.authenticate('local', function (err, user, info) {
              var error = err || info;
              if (!user) {
                return next(new _core.Unauthorized('Unable to find a user matching the provided credentials.'));
              }
              if (error) {
                return next(new _core.InternalServer());
              }
              if (!user.verified) {
                return next(new _core.UserNotVerifiedError());
              }
              return req.logIn(user, function (err) {
                if (err) return next(new _core.Unauthorized(err));
                // remove the password from the response.
                user.stripPassword();
                // sign the token
                var token = (0, _index.signToken)(user);
                req.user = user;
                res.set('Authorization', 'Bearer ' + token);
                // req.role = user.role[0].id;
                return res.json({ token: token, user: user });
              });
            })(req, res, next);

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function loginUser(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var verifyUser = exports.verifyUser = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
    var verifToken, user;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            verifToken = req.params.verifToken;

            if (verifToken) {
              _context4.next = 4;
              break;
            }

            return _context4.abrupt('return', next(new _core.BadRequest('Invalid account verification code')));

          case 4:
            _context4.next = 6;
            return _user2.default.query().where({ user_token: req.params.verifToken }).first();

          case 6:
            user = _context4.sent;
            _context4.next = 9;
            return _user2.default.query().patchAndFetchById(user.id, { verified: true });

          case 9:
            return _context4.abrupt('return', (0, _core.responseHandler)(res, 201, user));

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4['catch'](0);
            return _context4.abrupt('return', next(new _core.BadRequest(_context4.t0)));

          case 15:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 12]]);
  }));

  return function verifyUser(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

var checkAuthentication = exports.checkAuthentication = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
    var validUser;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _user2.default.query().findById(req.user.id).eager('[roles]');

          case 3:
            validUser = _context5.sent;

            if (validUser) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt('return', next(new _core.Unauthorized('Unable to find an account with the given information.')));

          case 6:
            validUser.stripPassword();
            return _context5.abrupt('return', (0, _core.responseHandler)(res, 200, validUser));

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5['catch'](0);
            return _context5.abrupt('return', next(new _core.BadRequest(_context5.t0)));

          case 13:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this, [[0, 10]]);
  }));

  return function checkAuthentication(_x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _objection = require('objection');

var objection = _interopRequireWildcard(_objection);

var _index = require('../../services/index');

var _templates = require('../../services/mailer/templates');

var _user = require('../user/user.model');

var _user2 = _interopRequireDefault(_user);

var _core = require('../../core');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')('boldrAPI:auth-controller');

function throwNotFound() {
  var error = new Error();
  error.statusCode = 404;
  throw error;
}