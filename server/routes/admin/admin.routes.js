import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import { checkRole } from '../../middleware/rbac';

import * as ctrl from './admin.controller';

const router = express.Router();

/**
 * @api {get} /stats Retrieve the latest counts for various records kept in the database
 * @apiName GetAllStats
 * @apiGroup Admin
 * @apiPermission admin
 * @apiSuccess {Number}   posts            The post count
 * @apiSuccess {Number}   tags             The tag count
 * @apiSuccess {Number}   users            The user count
 */

router.route('/stats', isAuthenticated, checkRole('Admin'))
  .get(ctrl.getAllStats);

export default router;
