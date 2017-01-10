'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _engine = require('../../engine');

var _engine2 = _interopRequireDefault(_engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function request() {
  return (0, _supertest2.default)(_engine2.default);
}

it('GET /settings -- List', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  var _ref2, status, body;

  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return request().get('/api/v1/settings').set('Accept', 'application/json');

        case 2:
          _ref2 = _context.sent;
          status = _ref2.status;
          body = _ref2.body;


          expect(status).toBe(200);
          expect(Array.isArray(body)).toBe(true);

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

it('GET /settings/:id -- Single setting', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
  var _ref4, status, body;

  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return request().get('/api/v1/settings/1').set('Accept', 'application/json');

        case 2:
          _ref4 = _context2.sent;
          status = _ref4.status;
          body = _ref4.body;


          expect(status).toBe(200);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');

        case 7:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
})));