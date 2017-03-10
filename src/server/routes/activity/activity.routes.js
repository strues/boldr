import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import { checkRole } from '../../middleware/rbac';
import * as ctrl from './activity.controller';

/**
 * @apiDefine Activity
 */

const router = express.Router();

/**
 * @api {get} /activities           List all activities
 * @apiName List Activities
 * @apiGroup Activity
 * @apiPermission admin
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiUse authHeader
 *
 * @apiDescription Return all activities from all admin users. Null or undefined values
 * will not be returned.
 *
 * @apiSuccess {String}   id                    The activity's id (uuid)
 * @apiSuccess {String}   user_id               The id (uuid) of user who performed the action
 * @apiSuccess {Number}   action_type_id        The id of the action type relating to the activity.
 * @apiSuccess {String}   activity_post         The id (uuid) for the post the action relates to
 * @apiSuccess {String}   activity_user         The id (uuid) of the user the action was performed on.
 * @apiSuccess {String}   activity_attachment   The id (uuid) of the attachment the action was performed on.
 * @apiSuccess {Number}   activity_tag          The id of the tag the action was performed on.
 * @apiSuccess {Number}   activity_menu_detail  The id of the menu detail the action was performed on.
 * @apiSuccess {String}   activity_template     The id (uuid) of the template the action was performed on.
 * @apiSuccess {String}   activity_page         The id (uuid) of the page the action was performed on.
 * @apiSuccess {Number}   activity_role         The id of the role the action was performed on.
 * @apiSuccess {Date}     created_at            The date the action was performed.
 * @apiSuccess {String}   type                  The action type (create update delete register)
 * @apiSuccess {Object[]} owner                 The user object of the user responsible for the action.
 * @apiSuccess {Object[]} post                  The post object if the activity is a post type
 * @apiSuccess {Object[]} attachment            The attachment object if the activity type matches attachment
 */
router.get('/', isAuthenticated, checkRole('Admin'), ctrl.listActivities);

export default router;
