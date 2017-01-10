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

var token = void 0;
beforeEach((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  var loginData, _ref2, body;

  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          loginData = {
            email: 'admin@boldr.io',
            password: 'password'
          };
          _context.next = 3;
          return request().post('/api/v1/auth/login').set('Accept', 'application/json').send(loginData);

        case 3:
          _ref2 = _context.sent;
          body = _ref2.body;

          token = body.token;

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

it('GET /stats -- Return stats', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
  var _ref4, status, body;

  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return request().get('/api/v1/admin/stats').set('Accept', 'application/json').set('Authorization', 'Bearer ' + token);

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