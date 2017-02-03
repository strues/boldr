import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import * as ctrl from './menu.controller';
import detailRoutes from './detail/menuDetail.routes';

const router = express.Router();
/**
 * @api {get} /menus      List all menus
 * @apiName listMenu
 * @apiGroup Menu
 * @apiPermission public
 */
router.get('/', ctrl.listMenu);

/**
 * @api {post} /menus     Create menu
 * @apiName create
 * @apiGroup Menu
 * @apiPermission admin
 * @apiUse authHeader
 */
router.post('/', isAuthenticated, ctrl.createMenu);

/**
 * @api {get} /menus/:id    Get menu
 * @apiName showMenu
 * @apiGroup Menu
 * @apiPermission public
 * @apiParam {Number} id The id of the menu
 */
router.get('/:id', ctrl.showMenu);
/**
 * @api {put} /menus/:id    Update menu
 * @apiName updateMenu
 * @apiGroup Menu
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {Number} id The id of the menu
 */
router.put('/:id', isAuthenticated, ctrl.updateMainMenu);

/**
 * @api {patch} /menus/:id      Update menu
 * @apiName updateMainMenu
 * @apiGroup Menu
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {Number} id The id of the link
 */
router.patch('/:id', isAuthenticated, ctrl.updateMainMenu);

router.use('/details', detailRoutes);
export default router;
