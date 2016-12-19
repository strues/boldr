import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import { BaseController } from '../../core';
import Activity from './activity.model';
import * as ctrl from './activity.controller';

const controller = new BaseController(Activity);

const router = new express.Router();

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
router.post('/', isAuthenticated, controller.create.bind(controller));

export default router;
