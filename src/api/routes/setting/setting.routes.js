import express from 'express';
import cache from '../../core/cache';
import * as ctrl from './setting.controller';
import { BaseController, isAuthenticated } from '../../core';

const router = express.Router();
/**
 * @api {get} /settings       Get all settings objects
 * @apiName listSettings
 * @apiGroup Settings
 * @apiSuccess (Success 200) {Object[]} settings All settings blocks.
 */
router.get('/', cache.route('settings'), ctrl.listSettings);
router.post('/', ctrl.addSetting);
router.get('/:id', ctrl.getSetting);
router.put('/:id', ctrl.updateSetting);
router.patch('/:id', ctrl.updateSetting);

export default router;
