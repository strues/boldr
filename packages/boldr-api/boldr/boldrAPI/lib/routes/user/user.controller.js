'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyUser = exports.adminUpdateUser = exports.getUser = exports.listUsers = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var listUsers = exports.listUsers = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var users, err, _err;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user2.default.query().eager('[roles]').omit(['password']);

          case 3:
            users = _context.sent;

            debug(users);

            if (users) {
              _context.next = 8;
              break;
            }

            err = new _core.NotFound();
            return _context.abrupt('return', next(err));

          case 8:
            return _context.abrupt('return', (0, _core.responseHandler)(res, 200, users));

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](0);
            _err = new _core.BadRequest(_context.t0);
            return _context.abrupt('return', next(_err));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 11]]);
  }));

  return function listUsers(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getUser = exports.getUser = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
    var user, err;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _user2.default.query().findById(req.params.id).eager('[roles]').omit(['password']);

          case 3:
            user = _context2.sent;
            return _context2.abrupt('return', (0, _core.responseHandler)(res, 200, user));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);
            err = new _core.BadRequest(_context2.t0);
            return _context2.abrupt('return', next(err));

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 7]]);
  }));

  return function getUser(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var adminUpdateUser = exports.adminUpdateUser = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
    var u, newRole, payload;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

            if (!req.body.role) {
              _context3.next = 11;
              break;
            }

            _context3.next = 4;
            return _user2.default.query().findById(req.params.id).eager('roles');

          case 4:
            u = _context3.sent;
            _context3.next = 7;
            return u.$relatedQuery('roles').unrelate();

          case 7:
            _context3.next = 9;
            return u.$relatedQuery('roles').relate({ id: req.body.role });

          case 9:
            newRole = _context3.sent;


            debug(newRole);

          case 11:
            payload = {
              display_name: req.body.display_name,
              bio: req.body.bio,
              // role: req.body.role,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              avatar_url: req.body.avatar_url

            };

            _user2.default.query().patchAndFetchById(req.params.id, payload).then(function (user) {
              return res.status(202).json(user);
            });
            _context3.next = 18;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3['catch'](0);
            return _context3.abrupt('return', res.status(500).json(_context3.t0));

          case 18:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 15]]);
  }));

  return function adminUpdateUser(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var destroyUser = exports.destroyUser = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _user2.default.query().findById(req.params.id).then(function (user) {
              return user.$relatedQuery('tokens').delete();
            });

          case 3:
            _context4.next = 5;
            return _user2.default.query().deleteById(req.params.id);

          case 5:
            return _context4.abrupt('return', res.status(204).json({ message: 'User deleted.' }));

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4['catch'](0);
            return _context4.abrupt('return', res.status(500).json(_context4.t0));

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 8]]);
  }));

  return function destroyUser(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateUser = updateUser;

var _core = require('../../core');

var _user = require('./user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')('boldrAPI:user-controller');
function updateUser(req, res, next) {
  // $FlowIssue
  if ('password' in req.body) {
    // $FlowIssue
    req.assert('password', 'Password must be at least 4 characters long').len(4);
  }
  // $FlowIssue
  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).json(errors);
  }

  return _user2.default.query().patchAndFetchById(req.params.id, req.body).then(function (user) {
    return res.status(202).json(user);
  });
}