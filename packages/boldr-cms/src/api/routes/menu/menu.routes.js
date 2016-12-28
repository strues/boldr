import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import { BaseController } from '../../core';
import Menu from './menu.model';
import * as ctrl from './menu.controller';
import detailRoutes from './detail/menuDetail.routes';

const controller = new BaseController(Menu);

const router = express.Router();
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
router.post('/', isAuthenticated, controller.create.bind(controller));

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
router.put('/:id', isAuthenticated, ctrl.updateMenu);

/**
 * @api {patch} /menus/:id Update a navigation
 * @apiName updateMenu
 * @apiGroup Menu
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {Number} id The id of the link
 */
router.patch('/:id', isAuthenticated, ctrl.updateMenu);

/**
 * @api {delete} /menus/:id Delete a menu
 * @apiName destroy
 * @apiGroup Menu
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {Number} id The id of the menu
 */
router.delete('/:id', isAuthenticated, controller.destroy.bind(controller));
router.use('/details', detailRoutes);
export default router;
