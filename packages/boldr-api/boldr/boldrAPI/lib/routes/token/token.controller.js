'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = exports.forgottenPassword = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * forgottenPassword takes an email address, generates a reset token, updates the user in the database, then sends
 * an email with the token to reset the user password.
 * @param req
 * @param res
 * @returns {*}
 */
/* eslint-disable no-unused-vars */
var forgottenPassword = exports.forgottenPassword = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var user, mailSubject, verificationToken, mailBody;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user2.default.query().where({ email: req.body.email }).first();

          case 2:
            user = _context.sent;

            if (user) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', res.status(400).json({ error: 'Unable to locate an user with the provided email.' }));

          case 5:
            mailSubject = '[Boldr] Password Reset';
            verificationToken = (0, _core.generateHash)();
            _context.next = 9;
            return user.$relatedQuery('tokens').insert({
              reset_password_token: verificationToken,
              user_id: user.id
            });

          case 9:
            mailBody = (0, _templates.forgotPasswordEmail)(verificationToken);
            _context.next = 12;
            return (0, _mailer2.default)(user, mailBody, mailSubject);

          case 12:
            return _context.abrupt('return', (0, _core.responseHandler)(res, 202, { message: 'Sending email with reset link' }));

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function forgottenPassword(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * resetPassword takes the user's reset_password_token, and a new password, hashes it and updates the password
 * @param req
 * @param res
 * @returns {*}
 */


var resetPassword = exports.resetPassword = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
    var findToken, mailSubject, user, mailBody;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _token2.default.query().where({ reset_password_token: req.body.token }).first();

          case 2:
            findToken = _context2.sent;

            if (findToken) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt('return', res.status(404).json({ error: 'Unable to locate an user with the provided token.' }));

          case 5:
            mailSubject = '[Boldr] Password Changed';
            _context2.next = 8;
            return _user2.default.query().findById(findToken.user_id);

          case 8:
            user = _context2.sent;
            _context2.next = 11;
            return _user2.default.query().patchAndFetchById(user.id, {
              password: req.body.password
            });

          case 11:
            _context2.next = 13;
            return (0, _templates.passwordModifiedEmail)(user);

          case 13:
            mailBody = _context2.sent;

            (0, _mailer2.default)(user, mailBody, mailSubject);
            return _context2.abrupt('return', (0, _core.responseHandler)(res, 204, 'Sent'));

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function resetPassword(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _mailer = require('../../services/mailer');

var _mailer2 = _interopRequireDefault(_mailer);

var _templates = require('../../services/mailer/templates');

var _user = require('../user/user.model');

var _user2 = _interopRequireDefault(_user);

var _core = require('../../core');

var _token = require('./token.model');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }