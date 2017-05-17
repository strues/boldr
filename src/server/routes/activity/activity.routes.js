import { Router } from 'express';
import { isAuthenticated } from '../../services/authentication';
import { checkRole } from '../../middleware/rbac';
import { wrapRouter } from '../../utils/asyncRouter';
import * as ctrl from './activity.controller';

const router = wrapRouter(new Router());

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
 * @apiSuccess {String}   userId               The id (uuid) of user who performed the action
 * @apiSuccess {Number}   action_type_id        The id of the action type relating to the activity.
 * @apiSuccess {String}   activityPost         The id (uuid) for the post the action relates to
 * @apiSuccess {String}   activityUser         The id (uuid) of the user the action was performed on.
 * @apiSuccess {String}   activityAttachment   The id (uuid) of the attachment the action was performed on.
 * @apiSuccess {Number}   activityTag          The id of the tag the action was performed on.
 * @apiSuccess {Number}   activityMenuDetail  The id of the menu detail the action was performed on.
 * @apiSuccess {String}   activityTemplate     The id (uuid) of the template the action was performed on.
 * @apiSuccess {String}   activityPage         The id (uuid) of the page the action was performed on.
 * @apiSuccess {Number}   activityRole         The id of the role the action was performed on.
 * @apiSuccess {Date}     createdAt            The date the action was performed.
 * @apiSuccess {String}   type                  The action type (create update delete register)
 * @apiSuccess {Object[]} owner                 The user object of the user responsible for the action.
 * @apiSuccess {Object[]} post                  The post object if the activity is a post type
 * @apiSuccess {Object[]} attachment            The attachment object if the activity type matches attachment
 */
router.get('/', isAuthenticated, checkRole('Admin'), ctrl.listActivities);

export default router;
