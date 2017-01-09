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

var _BaseModel2 = require('../../core/base/BaseModel');

var _BaseModel3 = _interopRequireDefault(_BaseModel2);

var _user = require('../user/user.model');

var _user2 = _interopRequireDefault(_user);

var _userRole = require('../user/userRole.model');

var _userRole2 = _interopRequireDefault(_userRole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Role = (_temp = _class = function (_BaseModel) {
  (0, _inherits3.default)(Role, _BaseModel);

  function Role() {
    (0, _classCallCheck3.default)(this, Role);
    return (0, _possibleConstructorReturn3.default)(this, (Role.__proto__ || (0, _getPrototypeOf2.default)(Role)).apply(this, arguments));
  }

  (0, _createClass3.default)(Role, null, [{
    key: 'tableName',
    get: function get() {
      return 'role';
    }
  }, {
    key: 'relationMappings',
    get: function get() {
      return {
        users: {
          relation: _objection.Model.ManyToManyRelation,
          modelClass: _user2.default,
          join: {
            from: 'role.id',
            through: {
              from: 'user_role.role_id',
              to: 'user_role.user_id'
            },
            to: 'user.id'
          }
        }
      };
    }
  }]);
  return Role;
}(_BaseModel3.default), _class.addTimestamps = true, _class.addUUID = true, _class.hidden = ['password'], _temp);
exports.default = Role;