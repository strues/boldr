'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _objection = require('objection');

var _roleModel = require('../role/role.model.js');

var _roleModel2 = _interopRequireDefault(_roleModel);

var _BaseModel2 = require('../../core/base/BaseModel');

var _BaseModel3 = _interopRequireDefault(_BaseModel2);

var _userModel = require('./user.model.js');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This is the pivot table connecting users to roles.
 *
 * Users can only have one of the same role.
 *
 * @see ../Role
 * @see ../User
 * @see ../../../db/migrations/20160924191402_user_roles.js
 * @extends ./BaseModel
 */
var UserRole = (_temp = _class = function (_BaseModel) {
  (0, _inherits3.default)(UserRole, _BaseModel);

  function UserRole() {
    (0, _classCallCheck3.default)(this, UserRole);
    return (0, _possibleConstructorReturn3.default)(this, (UserRole.__proto__ || (0, _getPrototypeOf2.default)(UserRole)).apply(this, arguments));
  }

  return UserRole;
}(_BaseModel3.default), _class.tableName = 'user_role', _class.addTimestamps = false, _class.addUUID = false, _class.relationMappings = {
  role: {
    relation: _objection.Model.BelongsToOneRelation,
    modelClass: _roleModel2.default,
    join: {
      from: 'user_role.role_id',
      to: 'role.id'
    }
  },
  user: {
    relation: _objection.Model.BelongsToOneRelation,
    modelClass: _userModel2.default,
    join: {
      from: 'user_role.user_id',
      to: 'user.id'
    }
  }
}, _temp);
exports.default = UserRole;