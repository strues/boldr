import { Router } from 'express';
import { wrapRouter } from '../../utils/asyncRouter';
import { isAuthenticated } from '../../services/authentication';
import { checkRole } from '../../middleware/rbac';

import * as ctrl from './admin.controller';

const router = wrapRouter(new Router());

/**
 * @api {get} /stats          List statistics
 * @apiName GetAllStats
 * @apiGroup Admin
 * @apiPermission admin
 * @apiSuccess {Number}   posts            The post count
 * @apiSuccess {Number}   tags             The tag count
 * @apiSuccess {Number}   users            The user count
 */

router
  .route('/stats', isAuthenticated, checkRole('Admin'))
  .get(ctrl.getAllStats);

export default router;
