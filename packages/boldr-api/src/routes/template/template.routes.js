import { Router } from 'express';
import { isAuthenticated } from '../../services/authentication';
import * as ctrl from './template.controller';

const router = new Router();

/**
 * @api {get} /pages       List all pages
 * @apiName listPages
 * @apiGroup Pages
 * @apiPermission public
 * @apiSuccess {Object[]} roles List of pages.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', ctrl.listTemplates);
router.get('/:name', ctrl.getTemplateByResource);
router.post('/', isAuthenticated, ctrl.createTemplate);

export default router;
