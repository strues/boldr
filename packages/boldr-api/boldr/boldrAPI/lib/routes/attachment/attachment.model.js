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

var _BaseModel2 = require('../../core/base/BaseModel');

var _BaseModel3 = _interopRequireDefault(_BaseModel2);

var _user = require('../user/user.model');

var _user2 = _interopRequireDefault(_user);

var _post = require('../post/post.model');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Attachment = (_temp = _class = function (_BaseModel) {
  (0, _inherits3.default)(Attachment, _BaseModel);

  function Attachment() {
    (0, _classCallCheck3.default)(this, Attachment);
    return (0, _possibleConstructorReturn3.default)(this, (Attachment.__proto__ || (0, _getPrototypeOf2.default)(Attachment)).apply(this, arguments));
  }

  (0, _createClass3.default)(Attachment, null, [{
    key: 'tableName',
    get: function get() {
      return 'attachment';
    }
  }, {
    key: 'relationMappings',
    get: function get() {
      return {
        owner: {
          relation: _objection.Model.BelongsToOneRelation,
          modelClass: _user2.default,
          join: {
            from: 'attachment.user_id',
            to: 'user.id'
          }
        },
        posts: {
          relation: _objection.Model.ManyToManyRelation,
          modelClass: _post2.default,
          join: {
            from: 'attachment.id',
            through: {
              from: 'post_attachment.attachment_id',
              to: 'post_attachment.post_id'
            },
            to: 'post.id'
          }
        }
      };
    }
  }]);
  return Attachment;
}(_BaseModel3.default), _class.addTimestamps = true, _class.addUUID = false, _temp);
exports.default = Attachment;