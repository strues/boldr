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
// Related Model


var _objection = require('objection');

var _base = require('../../core/base');

var _post = require('../post/post.model');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tag = (_temp = _class = function (_BaseModel) {
  (0, _inherits3.default)(Tag, _BaseModel);

  function Tag() {
    (0, _classCallCheck3.default)(this, Tag);
    return (0, _possibleConstructorReturn3.default)(this, (Tag.__proto__ || (0, _getPrototypeOf2.default)(Tag)).apply(this, arguments));
  }

  (0, _createClass3.default)(Tag, null, [{
    key: 'tableName',
    get: function get() {
      return 'tag';
    }
  }, {
    key: 'relationMappings',
    get: function get() {
      return {
        posts: {
          relation: _objection.Model.ManyToManyRelation,
          modelClass: _post2.default,
          join: {
            from: 'tag.id',
            through: {
              from: 'post_tag.tag_id',
              to: 'post_tag.post_id'
            },
            to: 'post.id'
          }
        }
      };
    }
  }]);
  return Tag;
}(_base.BaseModel), _class.addTimestamps = false, _class.addUUID = true, _temp);
exports.default = Tag;