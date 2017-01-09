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

var _user = require('../user/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Activity = (_temp = _class = function (_BaseModel) {
  (0, _inherits3.default)(Activity, _BaseModel);

  function Activity() {
    (0, _classCallCheck3.default)(this, Activity);
    return (0, _possibleConstructorReturn3.default)(this, (Activity.__proto__ || (0, _getPrototypeOf2.default)(Activity)).apply(this, arguments));
  }

  (0, _createClass3.default)(Activity, null, [{
    key: 'tableName',
    get: function get() {
      return 'activity';
    }
  }, {
    key: 'relationMappings',
    get: function get() {
      return {
        owner: {
          relation: _objection.Model.BelongsToOneRelation,
          modelClass: _user2.default,
          join: {
            from: 'activity.user_id',
            to: 'user.id'
          }
        }
      };
    }
  }]);
  return Activity;
}(_base.BaseModel), _class.addTimestamps = true, _class.addUUID = false, _temp);
exports.default = Activity;