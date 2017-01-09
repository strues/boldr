'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

// Related Models


var _objection = require('objection');

var _tag = require('../tag/tag.model');

var _tag2 = _interopRequireDefault(_tag);

var _user = require('../user/user.model');

var _user2 = _interopRequireDefault(_user);

var _attachment = require('../attachment/attachment.model');

var _attachment2 = _interopRequireDefault(_attachment);

var _BaseModel2 = require('../../core/base/BaseModel');

var _BaseModel3 = _interopRequireDefault(_BaseModel2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Post = (_temp = _class = function (_BaseModel) {
  (0, _inherits3.default)(Post, _BaseModel);

  function Post() {
    (0, _classCallCheck3.default)(this, Post);
    return (0, _possibleConstructorReturn3.default)(this, (Post.__proto__ || (0, _getPrototypeOf2.default)(Post)).apply(this, arguments));
  }

  (0, _createClass3.default)(Post, null, [{
    key: 'tableName',
    get: function get() {
      return 'post';
    }
  }, {
    key: 'idColumn',
    get: function get() {
      return 'id';
    }
  }, {
    key: 'relationMappings',
    get: function get() {
      return {
        author: {
          relation: _objection.Model.BelongsToOneRelation,
          modelClass: _user2.default,
          join: {
            from: 'post.user_id',
            to: 'user.id'
          }
        },
        tags: {
          relation: _objection.Model.ManyToManyRelation,
          modelClass: _tag2.default,
          join: {
            from: 'post.id',
            through: {
              from: 'post_tag.post_id',
              to: 'post_tag.tag_id'
            },
            to: 'tag.id'
          }
        },
        attachments: {
          relation: _objection.Model.ManyToManyRelation,
          modelClass: _attachment2.default,
          join: {
            from: 'post.id',
            through: {
              from: 'post_attachment.post_id',
              to: 'post_attachment.attachment_id'
            },
            to: 'attachment.id'
          }
        }
      };
    }
  }]);
  return Post;
}(_BaseModel3.default), _class.addTimestamps = true, _class.addUUID = false, _class.hidden = ['password'], _temp);
exports.default = Post;