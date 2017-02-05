import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import * as ctrl from './activity.controller';

const router = express.Router();

/**
 * @api {get} /activities           List all activities
 * @apiName ListActivities
 * @apiGroup Activity
 * @apiPermission public
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
 * @apiSuccess {Object[]} actionType            The action type object relating to the activity.
 * @apiSuccess {Object[]} owner                 The user object of the user responsible for the action.
 * @apiSuccess {Object[]} post                  The post object if the activity is a post type
 * @apiSuccess {Object[]} attachment            The attachment object if the activity type matches attachment
 */
router.get('/', ctrl.listActivities);

export default router;
