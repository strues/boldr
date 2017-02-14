import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import { checkRole } from '../../middleware/rbac';
import redisClient from '../../services/redis';
import * as ctrl from './comment.controller';

const cache = require('express-redis-cache')({ client: redisClient });

const router = express.Router();

/**
* @api {put} /:id     Edit Comment
* @apiName EditComment
* @apiGroup Comment
* @apiPermission member
* @apiParam   {String}   id  The id (uuid) of the comment

* @apiError {Object} 404 Unable to find a post matching the id.
* @apiError {Object} 404 Unable to find a comment matching the commentId.
* @apiError {Object} 401 You must be logged in or an admin to edit
*/
router.put('/:id', isAuthenticated, ctrl.editComment);
/**
* @api {delete} /:id      Delete comment
* @apiName DeleteComment
* @apiGroup Comment
* @apiPermission admin
* @apiParam   {String}   id  The id (uuid) of the comment

* @apiError {Object} 404 Unable to find a comment matching the id.
* @apiError {Object} 401 You must be logged in or an admin to delete
*/
router.delete('/:id', isAuthenticated, ctrl.deleteComment);
/**
* @api {post} /:id/reply      Comment Reply
* @apiName AddCommentReply
* @apiGroup Comment
* @apiPermission member
* @apiParam   {String}   id  The id (uuid) of the comment

* @apiError {Object} 404 Unable to find a comment matching the id.
* @apiError {Object} 401 You must be logged in or an admin to delete
*/
router.post('/:id/reply', isAuthenticated, ctrl.addCommentReply);

export default router;
