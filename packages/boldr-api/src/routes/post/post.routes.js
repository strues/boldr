import { Router } from 'express';
import BaseController from '../../core/baseController';
import processQuery from '../../utils/processQuery';
import { isAuthenticated } from '../../services/authentication';
import { checkRole } from '../../middleware/rbac';
import redisClient from '../../services/redis';
import { wrapRouter } from '../../utils/asyncRouter';
import Post from '../../models/post';
import * as ctrl from './post.controller';

// const cache = require('express-redis-cache')({ client: redisClient });

const controller = new BaseController(Post, 'id');

const router = wrapRouter(new Router());

router
  .route('/')
  /**
       * @api {get} /posts      List all posts
       * @apiName List All Posts
       * @apiGroup Post
       * @apiPermission public
       * @apiVersion 1.0.0
       *
       * @apiHeader {String} Content-Type Content-Type: application/json
       *
       * @apiUse listParams
       *
       * @apiSuccess {Array}  results
       * @apiSuccess {Number} total total number of results
       * @apiSuccess {Object[]} results.posts List of posts.
       * @apiSuccess {String}  results.posts.id               The id (uuid) of the post
       * @apiSuccess {String}  results.posts.slug             The slug of the post
       * @apiSuccess {String}  results.posts.title            The title of the post
       * @apiSuccess {String}  results.posts.excerpt          A short description or snippet of the post
       * @apiSuccess {String}  results.posts.content          The content of the post
       * @apiSuccess {String}  results.posts.feature_image    The URL for an image to use with the post
       * @apiSuccess {Object}  results.posts.meta             Meta data for the post
       * @apiSuccess {Object}  results.posts.attachments      Post attachments
       * @apiSuccess {String}  results.posts.background_image The URL for the posts background image
       * @apiSuccess {Boolean} results.posts.published        Whether the post is published for public display

       * @apiError   {Object} 400 Some parameters may contain invalid values.
       */
  .get(processQuery, controller.index.bind(controller))
  /**
       * @api {post} /posts         Create a new post
       * @apiName Create New Post
       * @apiGroup Post
       * @apiPermission admin
       * @apiVersion 1.0.0
       * @apiHeader {String} Content-Type Content-Type: application/json
       * @apiUse authHeader
       *
       * @apiParam {String}   title             The title of the post
       * @apiParam {String}   slug              The slug of the post which is the title, normalized for url use.
       * @apiParam {String}   excerpt           A short description or snippet of the post
       * @apiParam {String}   content           The content of the post as html
       * @apiParam {Object}   raw_content       Raw, unprocessed rich content blocks
       * @apiParam {String}   feature_image     The URL for an image to use with the post
       * @apiParam {String}   background_image  The URL for a background image to use in the post
       * @apiParam {String[]} tags              Array of tag names
       * @apiParam {Boolean}  published         Whether the post is published for public display
       * @apiParam {Object}   meta              Meta data for the post
       * @apiParam {Object}   attachments       Post attachments

       * @apiError {Object} 400 Some parameters may contain invalid values.
       * @apiError {Object} 409 There is already a post with this slug. Slugs (titles) must be unique.
       * @apiError {Object} 401 Unauthorized. You must be logged in to create a post.
       */
  .post(isAuthenticated, checkRole('Admin'), ctrl.createPost);

router
  .route('/slug/:slug')
  /**
       * @api {get} /posts/slug/:slug     Get post by slug
       * @apiName Get Slug
       * @apiGroup Post
       * @apiPermission public
       * @apiVersion 1.0.0
       * @apiHeader {String} Content-Type Content-Type: application/json
       *
       * @apiParam {String}     slug             The slug of the post

       * @apiSuccess {String}   id               The id (uuid) of the post
       * @apiSuccess {String}   slug              The slug of the post which is the title, normalized for url use.
       * @apiSuccess {String}   title            The title of the post
       * @apiSuccess {String}   excerpt          A short description or snippet of the post
       * @apiSuccess {String}   content           The content of the post as html
       * @apiSuccess {Object}   raw_content       Raw, unprocessed rich content blocks
       * @apiSuccess {String}   background_image  The URL for a background image to use in the post
       * @apiSuccess {Object}   meta              Meta data for the post
       * @apiSuccess {Object}   attachments       Post attachments
       * @apiSuccess {String}   feature_image    The URL for an image to use with the post
       * @apiSuccess {Object[]} tags            Tags related to the post
       * @apiSuccess {Object[]} comments          Comments related to the post
       * @apiSuccess {Boolean}  published        Whether the post is published for public display
       * @apiSuccess {Object}   author           The post author's user object
       * @apiError {Object} 404 Unable to find a post matching the slug.
       */
  .get(ctrl.getSlug);

router
  .route('/:id')
  /**
       * @api {get} /posts/:id      Get post by id
       * @apiName GetId
       * @apiGroup Post
       * @apiPermission public

       * @apiError {Object} 404 Unable to find a post matching the id.
       */
  .get(ctrl.getId)
  /**
       * @api {post} /posts/:id Add a tag to the post
       * @apiName AddTag
       * @apiGroup Post
       * @apiPermission admin

       * @apiError {Object} 404 Unable to find a post matching the id.
       */
  .post(isAuthenticated, checkRole('Admin'), ctrl.addTag)
  /**
       * @api {put} /posts/:id          Update post by id
       * @apiName UpdatePost
       * @apiGroup Post
       * @apiPermission admin

       * @apiError {Object} 404 Unable to find a post matching the id.
       */
  .put(isAuthenticated, checkRole('Admin'), ctrl.update)
  /**
       * @api {delete} /posts/:id       Delete post by id
       * @apiName DestroyPost
       * @apiGroup Post
       * @apiPermission admin

       * @apiError {Object} 404 Unable to find a post matching the id.
       */
  .delete(isAuthenticated, checkRole('Admin'), ctrl.destroy);

/**
* @api {post} /posts/:id/comments     Comment on post
* @apiName AddCommentToPost
* @apiGroup Post
* @apiPermission member

* @apiError {Object} 404 Unable to find a post matching the id.
* @apiError {Object} 401 You must be logged in to comment on a post
*/
router.post('/:id/comments', isAuthenticated, ctrl.addCommentToPost);

export default router;
