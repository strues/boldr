'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _engine = require('../../../engine');

var _engine2 = _interopRequireDefault(_engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function request() {
  return (0, _supertest2.default)(_engine2.default);
}

it('GET /links -- It should return links', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  var _ref2, status, body;

  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return request().get('/api/v1/menu-details').set('Accept', 'application/json');

        case 2:
          _ref2 = _context.sent;
          status = _ref2.status;
          body = _ref2.body;


          expect(status).toBe(200);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

it('POST /links -- Should require authorization', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
  var _ref4, status;

  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return request().post('/api/v1/menu-details').set('Accept', 'application/json').send({ name: 'test' });

        case 2:
          _ref4 = _context2.sent;
          status = _ref4.status;


          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
})));

it('GET /links/1 -- By its id', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
  var _ref6, status, body;

  return _regenerator2.default.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return request().get('/api/v1/menu-details/1').set('Accept', 'application/json');

        case 2:
          _ref6 = _context3.sent;
          status = _ref6.status;
          body = _ref6.body;


          expect(status).toBe(200);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');

        case 7:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, undefined);
})));

it('PUT /links/1 -- Should require authorization', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
  var _ref8, status;

  return _regenerator2.default.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return request().put('/api/v1/menu-details/1').set('Accept', 'application/json').send({ name: 'test' });

        case 2:
          _ref8 = _context4.sent;
          status = _ref8.status;


          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context4.stop();
      }
    }
  }, _callee4, undefined);
})));

it('PATCH /links/1 -- Should require authorization', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
  var _ref10, status;

  return _regenerator2.default.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return request().patch('/api/v1/menu-details/1').set('Accept', 'application/json').send({ name: 'test' });

        case 2:
          _ref10 = _context5.sent;
          status = _ref10.status;


          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context5.stop();
      }
    }
  }, _callee5, undefined);
})));

it('DELETE /links/1 -- Should require authorization', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
  var _ref12, status;

  return _regenerator2.default.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return request().delete('/api/v1/menu-details/1').set('Accept', 'application/json');

        case 2:
          _ref12 = _context6.sent;
          status = _ref12.status;


          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context6.stop();
      }
    }
  }, _callee6, undefined);
})));