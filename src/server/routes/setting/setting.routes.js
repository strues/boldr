import express from 'express';
import { checkRole } from '../../middleware/rbac';
import { isAuthenticated } from '../../services/authentication';
import * as ctrl from './setting.controller';

const router = express.Router();
/**
 * @api {get} /settings       Get all settings objects
 * @apiName listSettings
 * @apiGroup Settings
 * @apiSuccess (Success 200) {Object[]} settings All settings blocks.
 * @apiSuccess {Number}     setting.id            The setting's id
 * @apiSuccess {String}     setting.uuid          The UUID of the setting
 * @apiSuccess {String}     setting.key           The setting's key
 * @apiSuccess {String}     setting.value         The data related to the setting
 * @apiSuccess {String}     setting.description   What the setting is for
 */
router.get('/', ctrl.listSettings);
/**
 * @api {post} /settings      Add an additional setting
 * @apiName addSetting
 * @apiGroup Settings
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {String}   key           The setting's key
 * @apiParam {String}   value         The data related to the setting
 * @apiParam {String}   description   What the setting is for
 *
 * @apiSuccess (Success 201) {Object}   The newly created setting.
 */
router.post('/', isAuthenticated, checkRole('Admin'), ctrl.addSetting);
/**
 * @api {get} /settings/:id       Get a specific setting
 * @apiName getSetting
 * @apiGroup Settings
 * @apiPermission public
 * @apiParam {Number}       id            The id of the setting requested.
 * @apiSuccess {Number}     id            The setting's id
 * @apiSuccess {String}     uuid          The UUID of the setting
 * @apiSuccess {String}     key           The setting's key
 * @apiSuccess {String}     value         The data related to the setting
 * @apiSuccess {String}     description   What the setting is for
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError {Object} 409 There is already a setting with this id or uuid.
 * @apiError {Object} 401 Unauthorized. You must be logged in and an admin to update a setting.
 */
router.get('/:id', ctrl.getSetting);
/**
 * @api {put} /settings/:id       Update a specific setting
 * @apiName updateSetting
 * @apiGroup Settings
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {String}     key           The setting's key
 * @apiParam {String}     value         The data related to the setting
 * @apiParam {String}     description   What the setting is for
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError {Object} 409 There is already a setting with this id or uuid.
 * @apiError {Object} 401 Unauthorized. You must be logged in and an admin to update a setting.
 */
router.put('/:id', isAuthenticated, checkRole('Admin'), ctrl.updateSetting);
/**
 * @api {patch} /settings/:id       Update a specific setting
 * @apiName updateSetting
 * @apiGroup Settings
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {String}     key           The setting's key
 * @apiParam {String}     value         The data related to the setting
 * @apiParam {String}     description   What the setting is for
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError {Object} 409 There is already a setting with this id or uuid.
 * @apiError {Object} 401 Unauthorized. You must be logged in and an admin to update a setting.
 */
router.patch('/:id', isAuthenticated, checkRole('Admin'), ctrl.updateSetting);

export default router;
