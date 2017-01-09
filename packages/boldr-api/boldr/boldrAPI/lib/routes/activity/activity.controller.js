'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listActivities = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var listActivities = exports.listActivities = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var activities;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _activity2.default.query().orderBy('created_at', 'desc').limit(10).eager('owner');

          case 2:
            activities = _context.sent;
            return _context.abrupt('return', (0, _response2.default)(res, 200, activities));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function listActivities(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _response = require('../../core/response');

var _response2 = _interopRequireDefault(_response);

var _activity = require('./activity.model');

var _activity2 = _interopRequireDefault(_activity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')('boldrAPI:activity-controller');