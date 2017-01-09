'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _engine = require('../../engine');

var _engine2 = _interopRequireDefault(_engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function request() {
  return (0, _supertest2.default)(_engine2.default);
}

it('GET /posts -- List', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  var _ref2, status, body;

  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return request().get('/api/v1/posts').set('Accept', 'application/json');

        case 2:
          _ref2 = _context.sent;
          status = _ref2.status;
          body = _ref2.body;


          expect(status).toBe(200);
          expect(Array.isArray(body.results)).toBe(true);

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

it('GET /posts -- It should return the total number of posts', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
  var _ref4, status, body;

  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return request().get('/api/v1/posts').set('Accept', 'application/json');

        case 2:
          _ref4 = _context2.sent;
          status = _ref4.status;
          body = _ref4.body;


          expect(status).toBe(200);
          expect(body.total !== null).toBe(true);

        case 7:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
})));

it('GET /posts?include=[tags] -- List w/ tags', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
  var _ref6, status, body;

  return _regenerator2.default.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return request().get('/api/v1/posts?include=[tags]').set('Accept', 'application/json');

        case 2:
          _ref6 = _context3.sent;
          status = _ref6.status;
          body = _ref6.body;


          expect(status).toBe(200);
          expect(Array.isArray(body.results[0].tags)).toBe(true);

        case 7:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, undefined);
})));

it('GET /posts?include=[tags,author] -- List w/ tags/author', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
  var _ref8, status, body;

  return _regenerator2.default.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return request().get('/api/v1/posts?include=[tags,author]').set('Accept', 'application/json');

        case 2:
          _ref8 = _context4.sent;
          status = _ref8.status;
          body = _ref8.body;


          expect(status).toBe(200);
          expect(Array.isArray(body.results[0].tags)).toBe(true);
          expect((0, _typeof3.default)(body.results[0].author)).toBe('object');
          expect((0, _typeof3.default)(body.results[0].slug)).toBe('string');

        case 9:
        case 'end':
          return _context4.stop();
      }
    }
  }, _callee4, undefined);
})));

it('GET /posts/pid/:id -- By id', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
  var _ref10, status, body;

  return _regenerator2.default.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return request().get('/api/v1/posts/pid/5c9ed236-79f0-4ff7-93bd-2815f06c74b4').set('Accept', 'application/json');

        case 2:
          _ref10 = _context5.sent;
          status = _ref10.status;
          body = _ref10.body;

          expect(status).toBe(200);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');

        case 7:
        case 'end':
          return _context5.stop();
      }
    }
  }, _callee5, undefined);
})));

it('GET /posts/slug/:slug -- By slug', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
  var _ref12, status, body;

  return _regenerator2.default.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return request().get('/api/v1/posts/slug/just-another-post').set('Accept', 'application/json');

        case 2:
          _ref12 = _context6.sent;
          status = _ref12.status;
          body = _ref12.body;

          expect(status).toBe(200);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');

        case 7:
        case 'end':
          return _context6.stop();
      }
    }
  }, _callee6, undefined);
})));

var token = void 0;
beforeEach((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
  var loginData, _ref14, body;

  return _regenerator2.default.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          loginData = {
            email: 'admin@boldr.io',
            password: 'password'
          };
          _context7.next = 3;
          return request().post('/api/v1/auth/login').set('Accept', 'application/json').send(loginData);

        case 3:
          _ref14 = _context7.sent;
          body = _ref14.body;

          token = body.token;

        case 6:
        case 'end':
          return _context7.stop();
      }
    }
  }, _callee7, undefined);
})));

it('POST /posts -- Fails without a title', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
  var _ref16, status;

  return _regenerator2.default.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return request().post('/api/v1/posts').set('Accept', 'application/json').set('Authorization', 'Bearer ' + token).send({
            // title: faker.name.title(),
            feature_image: _faker2.default.image.imageUrl(),
            content: _faker2.default.lorem.paragraphs(),
            excerpt: _faker2.default.lorem.paragraph(),
            status: 'published',
            tags: 'foo,bar'
          });

        case 2:
          _ref16 = _context8.sent;
          status = _ref16.status;


          expect(status).toBe(400);

        case 5:
        case 'end':
          return _context8.stop();
      }
    }
  }, _callee8, undefined);
})));

it('POST /posts -- Creates new post', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
  var _ref18, status, body;

  return _regenerator2.default.wrap(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return request().post('/api/v1/posts').set('Accept', 'application/json').set('Authorization', 'Bearer ' + token).send({
            title: _faker2.default.name.title(),
            feature_image: _faker2.default.image.imageUrl(),
            content: _faker2.default.lorem.paragraphs(),
            excerpt: _faker2.default.lorem.paragraph(),
            status: 'published',
            tags: 'foo,bar'
          });

        case 2:
          _ref18 = _context9.sent;
          status = _ref18.status;
          body = _ref18.body;


          expect(status).toBe(201);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');

        case 7:
        case 'end':
          return _context9.stop();
      }
    }
  }, _callee9, undefined);
})));