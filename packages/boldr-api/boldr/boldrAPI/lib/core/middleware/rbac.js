'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.checkPermissions = checkPermissions;
exports.checkRole = checkRole;

var _express = require('express');

var _user = require('../../routes/user/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')('boldrAPI:rbac');
/**
 * This middleware checks to see if the given user/token combination has the provided role.
 *
 * @param {string} role
 * @returns {function}
 */
function checkPermissions(_ref) {
  var _ref$role = _ref.role,
      role = _ref$role === undefined ? null : _ref$role;

  return function (req, res, next) {
    debug(req);
    var user = req.user;

    if (role && !hasRole(user, role)) {
      return next(new Error('User doesn\'t have required role. \'' + role + '\' role is needed.'));
    }

    return next();
  };
}

/**
 * This checks to make sure that the user has a given role.
 *
 * @param {string} role
 * @returns {function}
 */
function checkRole() {
  var _this = this;

  var role = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  return function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var userInfo, userRole;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _user2.default.query().findById(req.user.id).eager('roles').first();

            case 2:
              userInfo = _context.sent;
              userRole = userInfo.roles[0].id;

              debug(userRole);

              if (!(!userRole === role)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt('return', res.status(403).json('Forbidden. Your role does not have sufficient privileges.'));

            case 7:
              return _context.abrupt('return', next());

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x2, _x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();
}

/**
 * This checks to see if the user has the given role.
 *
 * @param {object} user
 * @param {string} role
 * @returns {boolean}
 */
function hasRole() {
  var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var role = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  return user && role && user.hasRole(role);
}

exports.default = function () {
  var rbac = (0, _express.Router)();

  return rbac;
};