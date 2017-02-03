import express from 'express';
import { isAuthenticated } from '../../../services/authentication';
import * as ctrl from './menuDetail.controller';

const router = express.Router({ mergeParams: true });
/**
 * @api {get} /menu-details     List all menu items
 * @apiName getDetails
 * @apiGroup MenuDetails
 * @apiPermission public
 */
router.get('/', ctrl.getDetails);
/**
 * @api {post} /menu-details    Create menu detail
 * @apiName createDetail
 * @apiGroup MenuDetails
 * @apiUse authHeader
 * @apiPermission admin
 */
router.post('/', isAuthenticated, ctrl.createDetail);
/**
 * @api {get} /menu-details/:id     Get menu detail
 * @apiName showDetail
 * @apiGroup MenuDetails
 * @apiPermission public
 * @apiParam {Number} id The id of the detail
 */
router.get('/:id', ctrl.showDetail);
/**
 * @api {put} /menu-details/:id     Update menu detail
 * @apiName updateDetail
 * @apiGroup MenuDetails
 * @apiPermission admin
 * @apiParam {Number} id The id of the detail
 */
router.put('/:id', isAuthenticated, ctrl.updateDetail);
/**
 * @api {patch} /menu-details/:id     Update menu detail
 * @apiName updateDetail
 * @apiGroup MenuDetails
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {Number} id The id of the detail
 */
router.patch('/:id', isAuthenticated, ctrl.updateDetail);
/**
 * @api {delete} /menu-details/:id    Delete detail
 * @apiName destroy
 * @apiGroup MenuDetails
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {Number} id The id of the detail
 */
router.delete('/:id', isAuthenticated, ctrl.deleteDetail);

export default router;
