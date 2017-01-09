'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authentication = require('../../services/authentication');

var _core = require('../../core');

var _menu = require('./menu.model');

var _menu2 = _interopRequireDefault(_menu);

var _menu3 = require('./menu.controller');

var ctrl = _interopRequireWildcard(_menu3);

var _menuDetail = require('./detail/menuDetail.routes');

var _menuDetail2 = _interopRequireDefault(_menuDetail);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = new _core.BaseController(_menu2.default);

var router = _express2.default.Router();
/**
 * @api {get} /menus Return a list of all menu blocks
 * @apiName listMenu
 * @apiGroup Menu
 * @apiPermission public
 */
router.get('/', ctrl.listMenu);

/**
 * @api {post} /menus Create a new menu
 * @apiName create
 * @apiGroup Menu
 * @apiPermission admin
 * @apiUse authHeader
 */
router.post('/', _authentication.isAuthenticated, controller.create.bind(controller));

/**
 * @api {get} /menus/:id Return a specific menu by its id.
 * @apiName showMenu
 * @apiGroup Menu
 * @apiPermission public
 * @apiParam {Number} id The id of the menu
 */
router.get('/:id', ctrl.showMenu);
/**
 * @api {put} /menus/:id Update a menu
 * @apiName updateMenu
 * @apiGroup Menu
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {Number} id The id of the menu
 */
router.put('/:id', _authentication.isAuthenticated, ctrl.updateMenu);

/**
 * @api {patch} /menus/:id Update a navigation
 * @apiName updateMenu
 * @apiGroup Menu
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {Number} id The id of the link
 */
router.patch('/:id', _authentication.isAuthenticated, ctrl.updateMenu);

/**
 * @api {delete} /menus/:id Delete a menu
 * @apiName destroy
 * @apiGroup Menu
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {Number} id The id of the menu
 */
router.delete('/:id', _authentication.isAuthenticated, controller.destroy.bind(controller));
router.use('/details', _menuDetail2.default);
exports.default = router;