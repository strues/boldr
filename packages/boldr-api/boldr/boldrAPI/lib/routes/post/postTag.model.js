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

var _objection = require('objection');

var _tag = require('../tag/tag.model');

var _tag2 = _interopRequireDefault(_tag);

var _post = require('./post.model');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostTag = (_temp = _class = function (_Model) {
  (0, _inherits3.default)(PostTag, _Model);

  function PostTag() {
    (0, _classCallCheck3.default)(this, PostTag);
    return (0, _possibleConstructorReturn3.default)(this, (PostTag.__proto__ || (0, _getPrototypeOf2.default)(PostTag)).apply(this, arguments));
  }

  (0, _createClass3.default)(PostTag, null, [{
    key: 'tableName',
    get: function get() {
      return 'post_tag';
    }
  }, {
    key: 'idColumn',
    get: function get() {
      return ['post_id', 'tag_id'];
    }
  }, {
    key: 'relationMappings',
    get: function get() {
      return {
        tag: {
          relation: _objection.Model.BelongsToOneRelation,
          modelClass: _tag2.default,
          join: {
            from: 'post_tag.tag_id',
            to: 'tag.id'
          }
        },
        post: {
          relation: _objection.Model.BelongsToOneRelation,
          modelClass: _post2.default,
          join: {
            from: 'post_tag.post_id',
            to: 'post.id'
          }
        }
      };
    }
  }]);
  return PostTag;
}(_objection.Model), _class.addTimestamps = false, _class.addUUID = false, _temp);
exports.default = PostTag;