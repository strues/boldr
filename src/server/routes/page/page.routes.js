import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import * as ctrl from './page.controller';

const router = new express.Router();
/**
 * @api {get} /pages       Get all pages
 * @apiName listPages
 * @apiGroup Pages
 * @apiPermission public
 * @apiSuccess {Object[]} roles List of pages.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', ctrl.listPages);
router.get('/:url', ctrl.getPageByUrl);
router.post('/', isAuthenticated, ctrl.createPage);
// router.put('/:id', isAuthenticated, controller.update.bind(controller));
// router.patch('/:id', isAuthenticated, controller.update.bind(controller));
// router.delete('/:id', isAuthenticated, controller.destroy.bind(controller));

export default router;
