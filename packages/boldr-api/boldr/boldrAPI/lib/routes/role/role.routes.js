'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authentication = require('../../services/authentication');

var _core = require('../../core');

var _role = require('./role.controller');

var ctrl = _interopRequireWildcard(_role);

var _role2 = require('./role.model');

var _role3 = _interopRequireDefault(_role2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = new _core.BaseController(_role3.default);

var router = new _express2.default.Router();
/**
 * @api {get} /roles       Get a list of all roles
 * @apiName listRoles
 * @apiGroup Role
 * @apiPermission public
 * @apiSuccess {Object[]} roles               List containing the role objects.
 * @apiSuccess {Number}   roles.id            id of the role
 * @apiSuccess {String}   roles.uuid          uuid of the role
 * @apiSuccess {String}   roles.name          name of the role
 * @apiSuccess {String}   roles.image         url for the image associated with the role
 * @apiSuccess {String}   roles.description   description of the role
 * @apiSuccess {Object[]} roles.users         array containing the associated user objects.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', ctrl.listRoles);
/**
 * @api {get} /roles/:id       Get information for the specific role
 * @apiName getRole
 * @apiGroup Role
 * @apiPermission public
 * @apiParam {Number}     id            the role id
 * @apiSuccess {Number}   id            id of the role
 * @apiSuccess {String}   uuid          uuid of the role
 * @apiSuccess {String}   name          name of the role
 * @apiSuccess {String}   image         url for the image associated with the role
 * @apiSuccess {String}   description   description of the role
 * @apiSuccess {Object[]} roles.users   array containing the associated user objects.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/:id', controller.show.bind(controller));
router.post('/', _authentication.isAuthenticated, controller.create.bind(controller));
router.put('/:id', _authentication.isAuthenticated, controller.update.bind(controller));
router.patch('/:id', _authentication.isAuthenticated, controller.update.bind(controller));
router.delete('/:id', _authentication.isAuthenticated, controller.destroy.bind(controller));

exports.default = router;