'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authentication = require('../../services/authentication');

var _core = require('../../core');

var _activity = require('./activity.model');

var _activity2 = _interopRequireDefault(_activity);

var _activity3 = require('./activity.controller');

var ctrl = _interopRequireWildcard(_activity3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = new _core.BaseController(_activity2.default);

var router = new _express2.default.Router();

/**
 * @api {get} /activities Retrieve all latest activities
 * @apiName listActivities
 * @apiGroup Activity
 * @apiPermission public
 * @apiSuccess {Object[]} accounts List of accounts.
 */
router.get('/', ctrl.listActivities);

/**
 * @api {get} /activities/:id Retrieve activity
 * @apiName showActivity
 * @apiGroup Activity
 * @apiPermission public
 * @apiSuccess {Object} activity Activity's data.
 * @apiError 404 Activity not found.
 */
router.get('/:id', controller.show.bind(controller));

/**
 * @api {post} /activities Create activity
 * @apiName createActivity
 * @apiGroup Activity
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {String} uuid a v4 spec UUID
 * @apiParam {String} account_id The account id of the creator
 * @apiParam {String} action What the action was
 * @apiParam {Enum[String]} type    create,update,delete,register
 * @apiParam {Object} data The data of the action
 * @apiParam {String} entry_table The table name of the action
 * @apiParam {String} entry_uuid The UUID of the action
 * @apiSuccess (Sucess 201) {Object} activity Actitys's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Unauthorized access only.
 */
router.post('/', _authentication.isAuthenticated, controller.create.bind(controller));

exports.default = router;