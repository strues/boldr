'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../../core/index');

var _authentication = require('../../services/authentication');

var _setting = require('./setting.controller');

var ctrl = _interopRequireWildcard(_setting);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
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
router.post('/', _authentication.isAuthenticated, (0, _index.checkRole)('Admin'), ctrl.addSetting);
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
router.put('/:id', _authentication.isAuthenticated, (0, _index.checkRole)('Admin'), ctrl.updateSetting);
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
router.patch('/:id', _authentication.isAuthenticated, (0, _index.checkRole)('Admin'), ctrl.updateSetting);

exports.default = router;