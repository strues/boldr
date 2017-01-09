'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateHash = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var generateHash = exports.generateHash = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var SALT, randomString, STRING;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return bcrypt.genSaltSync(10);

          case 2:
            SALT = _context.sent;

            randomString = function randomString() {
              return Math.random().toString().substr(2, 8);
            };

            STRING = (0, _from2.default)(new Array(5), randomString).join();
            return _context.abrupt('return', bcrypt.hashSync(STRING, SALT));

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function generateHash() {
    return _ref.apply(this, arguments);
  };
}(); /* eslint-disable import/prefer-default-export */


var _bcryptjs = require('bcryptjs');

var bcrypt = _interopRequireWildcard(_bcryptjs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }