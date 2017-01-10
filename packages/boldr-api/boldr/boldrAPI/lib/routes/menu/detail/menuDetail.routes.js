'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authentication = require('../../../services/authentication');

var _core = require('../../../core');

var _menuDetail = require('./menuDetail.model');

var _menuDetail2 = _interopRequireDefault(_menuDetail);

var _menuDetail3 = require('./menuDetail.controller');

var ctrl = _interopRequireWildcard(_menuDetail3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = new _core.BaseController(_menuDetail2.default);

var router = _express2.default.Router();
/**
 * @api {get} /menu-details Return a list of all menu details
 * @apiName getDetails
 * @apiGroup MenuDetails
 * @apiPermission public
 */
router.get('/', ctrl.getDetails);
/**
 * @api {post} /menu-details Create a new menu detail
 * @apiName createDetail
 * @apiGroup MenuDetails
 * @apiUse authHeader
 * @apiPermission admin
 */
router.post('/', _authentication.isAuthenticated, ctrl.createDetail);
/**
 * @api {get} /menu-details/:id Return a specific menu detail by its id.
 * @apiName showDetail
 * @apiGroup MenuDetails
 * @apiPermission public
 * @apiParam {Number} id The id of the detail
 */
router.get('/:id', ctrl.showDetail);
/**
 * @api {put} /menu-details/:id Update a menu detail
 * @apiName updateDetail
 * @apiGroup MenuDetails
 * @apiPermission admin
 * @apiParam {Number} id The id of the detail
 */
router.put('/:id', _authentication.isAuthenticated, ctrl.updateDetail);
/**
 * @api {patch} /menu-details/:id Update a menu detail
 * @apiName updateDetail
 * @apiGroup MenuDetails
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {Number} id The id of the detail
 */
router.patch('/:id', _authentication.isAuthenticated, ctrl.updateDetail);
/**
 * @api {delete} /menu-details/:id Delete a detail
 * @apiName destroy
 * @apiGroup MenuDetails
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {Number} id The id of the detail
 */
router.delete('/:id', _authentication.isAuthenticated, controller.destroy.bind(controller));

exports.default = router;