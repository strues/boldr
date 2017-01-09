'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTag = exports.destroy = exports.getId = exports.getSlug = exports.createPost = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var createPost = exports.createPost = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var errors, postSlug, checkExisting, newPost, i, existingTag, taggedPost;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req.assert('title', 'A title must be provided').notEmpty();
            req.assert('content', 'Content can not be empty').notEmpty();
            req.sanitize('title').trim();
            errors = req.validationErrors();

            if (!errors) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', res.status(400).send(errors));

          case 6:
            postSlug = (0, _slugIt2.default)(req.body.title);

            // look for a matching slug in the database

            _context.next = 9;
            return _post2.default.query().where('slug', postSlug).first();

          case 9:
            checkExisting = _context.sent;

            if (!checkExisting) {
              _context.next = 12;
              break;
            }

            return _context.abrupt('return', next(new _index.Conflict()));

          case 12:
            _context.next = 14;
            return _post2.default.query().insert({
              id: (0, _uuid2.default)(),
              title: req.body.title,
              slug: postSlug,
              excerpt: req.body.excerpt,
              content: req.body.content,
              feature_image: req.body.feature_image,
              meta: req.body.meta,
              user_id: req.user.id
            });

          case 14:
            newPost = _context.sent;
            _context.next = 17;
            return newPost.$relatedQuery('author').relate({ id: req.user.id });

          case 17:
            if (req.body.tags) {
              _context.next = 19;
              break;
            }

            return _context.abrupt('return', next(new _index.BadRequest('You must enter tags')));

          case 19:
            req.body.tags = req.body.tags.split(',', 5).map(function (tag) {
              return tag.substr(0, 15);
            });
            i = 0;

          case 21:
            if (!(i < req.body.tags.length)) {
              _context.next = 38;
              break;
            }

            _context.next = 24;
            return _tag2.default.query().where('name', req.body.tags[i]).first();

          case 24:
            existingTag = _context.sent;

            if (!existingTag) {
              _context.next = 33;
              break;
            }

            debug(existingTag, 'existing tag found');
            _context.next = 29;
            return _postTag2.default.query().insert({
              tag_id: existingTag.id,
              post_id: newPost.id
            });

          case 29:
            taggedPost = _context.sent;

            debug(taggedPost);
            _context.next = 35;
            break;

          case 33:
            _context.next = 35;
            return newPost.$relatedQuery('tags').insert({ name: req.body.tags[i] });

          case 35:
            i++;
            _context.next = 21;
            break;

          case 38:
            _context.next = 40;
            return _activity2.default.query().insert({
              id: (0, _uuid2.default)(),
              name: newPost.title,
              user_id: req.user.id,
              action: 'New post',
              type: 'create',
              data: { newPost: newPost },
              entry_uuid: newPost.id,
              entry_table: 'post'
            });

          case 40:
            return _context.abrupt('return', (0, _index.responseHandler)(res, 201, newPost));

          case 41:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function createPost(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getSlug = exports.getSlug = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
    var post;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _post2.default.query().where({ slug: req.params.slug }).eager('[tags, author]').omit('password').first();

          case 3:
            post = _context2.sent;

            if (post) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt('return', res.status(404).json({ message: 'Unable to find a post matching ' + req.params.slug + '.' }));

          case 6:
            return _context2.abrupt('return', (0, _index.responseHandler)(res, 200, post));

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', res.status(500).json({ message: _context2.t0 }));

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 9]]);
  }));

  return function getSlug(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var getId = exports.getId = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
    var post;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _post2.default.query().findById(req.params.id).eager('[tags, author]').omit('password').first();

          case 3:
            post = _context3.sent;
            return _context3.abrupt('return', (0, _index.responseHandler)(res, 200, post));

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3['catch'](0);
            return _context3.abrupt('return', res.status(500).json({ message: _context3.t0 }));

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 7]]);
  }));

  return function getId(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

var destroy = exports.destroy = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _post2.default.query().delete().where('id', req.params.id).first();

          case 2:
            return _context4.abrupt('return', res.status(204).send({}));

          case 3:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function destroy(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

var addTag = exports.addTag = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
    var post, tag;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _post2.default.query().findById(req.params.id);

          case 2:
            post = _context5.sent;

            if (post) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt('return', res.status(404).json({ message: 'Unable to find a post with the ID: ' + req.params.id + '.' }));

          case 5:
            _context5.next = 7;
            return post.$relatedQuery('tags').insert(req.body);

          case 7:
            tag = _context5.sent;
            return _context5.abrupt('return', (0, _index.responseHandler)(res, 202, tag));

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function addTag(_x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();

exports.update = update;

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _index = require('../../core/index');

var _slugIt = require('../../utils/slugIt');

var _slugIt2 = _interopRequireDefault(_slugIt);

var _tag = require('../tag/tag.model');

var _tag2 = _interopRequireDefault(_tag);

var _activity = require('../activity/activity.model');

var _activity2 = _interopRequireDefault(_activity);

var _post = require('./post.model');

var _post2 = _interopRequireDefault(_post);

var _postTag = require('./postTag.model');

var _postTag2 = _interopRequireDefault(_postTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Models
var debug = require('debug')('boldrAPI:post-controller');

function update(req, res) {
  debug(req.body);
  return _post2.default.query().patchAndFetchById(req.params.id, req.body).then(function (post) {
    return (0, _index.responseHandler)(res, 202, post);
  });
}