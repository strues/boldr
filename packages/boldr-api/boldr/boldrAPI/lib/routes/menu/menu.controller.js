'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMenu = exports.showMenu = exports.listMenu = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var listMenu = exports.listMenu = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var menus;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _menu2.default.query().eager('details').returning('*');

          case 3:
            menus = _context.sent;

            if (menus) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', res.status(404).json({ message: 'Unable to find any navigations. Try creating one.' }));

          case 6:
            return _context.abrupt('return', res.status(200).json(menus));

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', next(new _index.InternalServer()));

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 9]]);
  }));

  return function listMenu(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
// Model


var showMenu = exports.showMenu = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
    var menu;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _menu2.default.query().eager('[details]').findById(req.params.id);

          case 3:
            menu = _context2.sent;
            return _context2.abrupt('return', (0, _index.responseHandler)(res, 200, menu));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', next(new _index.InternalServer(_context2.t0)));

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 7]]);
  }));

  return function showMenu(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var updateMenu = exports.updateMenu = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
    var updatedNav;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _menu2.default.query().patchAndFetchById(1, req.body);

          case 3:
            updatedNav = _context3.sent;
            return _context3.abrupt('return', res.status(201).json(updatedNav));

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3['catch'](0);
            return _context3.abrupt('return', next(new _index.InternalServer(_context3.t0)));

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 7]]);
  }));

  return function updateMenu(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var _index = require('../../core/index');

var _menu = require('./menu.model');

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }