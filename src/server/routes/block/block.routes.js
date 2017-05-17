import { Router } from 'express';
import { wrapRouter } from '../../utils/asyncRouter';
import { isAuthenticated } from '../../services/authentication';
import * as ctrl from './block.controller';

const router = wrapRouter(new Router());

/**
 * @api {get} /blocks       List all blocks
 * @apiName ListBlocks
 * @apiGroup Blocks
 * @apiPermission public
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', ctrl.listBlocks);
router.get('/:id', ctrl.getBlock);
router.post('/', ctrl.createBlock);

export default router;
