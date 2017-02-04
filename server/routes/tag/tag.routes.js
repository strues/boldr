import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import * as ctrl from './tag.controller';

const router = express.Router();
/**
 * @api {get} /tags       List all tags
 * @apiName ListTags
 * @apiGroup Tag
 * @apiPermission public
 * @apiUse listParams
 * @apiParam  {String}  include=posts     Return the posts with tags
 * @apiSuccess (200) {Object[]} tags List of tags.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', ctrl.listTags);
/**
 * @api {get} /tags/:id    Get specific tag
 * @apiName GetTag
 * @apiGroup Tag
 * @apiPermission public
 * @apiSuccess (200) {Object} tag The tag requested.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/:id', ctrl.getTag);
/**
 * @api {get} /tags/:name/posts     Get tag by name with related posts
 * @apiName GetTaggedPostsByName
 * @apiGroup Tag
 * @apiPermission public
 * @apiParam {String} name The tag name
 * @apiSuccess (200) {Object[]} posts List of posts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/:name/posts', ctrl.getTaggedPostsByName);
/**
 * @api {get} /tags/posts/:id      Get related posts from tag id
 * @apiName GetTaggedPosts
 * @apiGroup Tag
 * @apiPermission public
 * @apiParam {Number} id The tag id
 * @apiSuccess (200) {Object[]} posts List of posts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/posts/:id', ctrl.getTaggedPosts);
/**
 * @api {post} /tags                Create tag
 * @apiName CreateTAg
 * @apiGroup Tag
 * @apiPermission admin
 * @apiHeader {String} Authorization {token}
 * @apiSuccess (201) {Object} tag The newly created tag
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError {Object} 409 There is already a tag with this name
 * @apiError {Object} 401 Unauthorized. You must be logged in to create a tag.
 */
router.post('/', isAuthenticated, ctrl.createTag);
/**
 * @api {put} /tags/:id             Update tag
 * @apiName UpdateTag
 * @apiGroup Tag
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {Number} id The tag id
 * @apiSuccess (202) {Object} tag The updated tag.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError {Object} 401 Unauthorized. You must be logged in to create a tag.
 */
router.put('/:id', isAuthenticated, ctrl.updateTag);
/**
 * @api {patch} /tags/:id           Update tag
 * @apiName UpdateTag
 * @apiGroup Tag
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {Number} id The tag id
 * @apiSuccess (202) {Object} tag The updated tag.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError {Object} 401 Unauthorized. You must be logged in to create a tag.
 */
router.patch('/:id', isAuthenticated, ctrl.updateTag);
/**
 * @api {delete} /tags/:id          Delete tag permanently
 * @apiName DeleteTag
 * @apiGroup Tag
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {Number} id The tag id
 * @apiSuccess 204
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError {Object} 401 Unauthorized. You must be logged in to create a tag.
 */
router.delete('/:id', isAuthenticated, ctrl.deleteTag);
/**
 * @api {get} /tags/:id/relate/:postid    Relate tag to post
 * @apiName RelateTagToPost
 * @apiGroup Tag
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {Number} id      The tag id
 * @apiPAram {String} postid  the id (uuid) of the post to relate
 * @apiSuccess 204
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError {Object} 401 Unauthorized. You must be logged in to create a tag.
 */
router.get('/:id/relate/:postid', ctrl.relateTagToPost);

export default router;
