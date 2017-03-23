import express from 'express';

import config from '../config';
import activityRoutes from './activity/activity.routes';
import adminRoutes from './admin/admin.routes';
import attachmentRoutes from './attachment/attachment.routes';
import authRoutes from './auth/auth.routes';
import commentRoutes from './comment/comment.routes';
import menuDetailRoutes from './menu/detail/menuDetail.routes';
import menuRoutes from './menu/menu.routes';
import pageRoutes from './page/page.routes';
import postRoutes from './post/post.routes';
import roleRoutes from './role/role.routes';
import settingRoutes from './setting/setting.routes';
import tagRoutes from './tag/tag.routes';
import templateRoutes from './template/template.routes';
import tokenRoutes from './token/token.routes';
import userRoutes from './user/user.routes';

const API_PREFIX = config.get('apiPrefix');

export default app => {
  app.get(`${API_PREFIX}/health-check`, (req, res) => {
    res.status(200);
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.json({
      health: 'good',
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    });
  });

  app.use(`${API_PREFIX}/activities`, activityRoutes);
  app.use(`${API_PREFIX}/admin`, adminRoutes);
  app.use(`${API_PREFIX}/attachments`, attachmentRoutes);
  app.use(`${API_PREFIX}/auth`, authRoutes);
  app.use(`${API_PREFIX}/comments`, commentRoutes);
  app.use(`${API_PREFIX}/menu-details`, menuDetailRoutes);
  app.use(`${API_PREFIX}/menus`, menuRoutes);
  app.use(`${API_PREFIX}/pages`, pageRoutes);
  app.use(`${API_PREFIX}/posts`, postRoutes);
  app.use(`${API_PREFIX}/roles`, roleRoutes);

  app.use(`${API_PREFIX}/settings`, settingRoutes);
  app.use(`${API_PREFIX}/tags`, tagRoutes);
  app.use(`${API_PREFIX}/templates`, templateRoutes);
  app.use(`${API_PREFIX}/tokens`, tokenRoutes);
  app.use(`${API_PREFIX}/users`, userRoutes);

  app.use((err, req, res, next) => {
    if (err) {
      res.status(err.statusCode || err.status || 500).send(err.data || err.message || {});
    } else {
      next();
    }
  });
};
/**
 * @apiDefine listParams
 * @apiParam {String[]} include   Include related properties of the object.
 * This is an alternative way to fetch a relevant data in a single call. ?include=[relationship]
 * @apiParam {Number{1..30}} [page=1]           Page number.
 * @apiParam {Number{1..100}} [limit=30]        Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt]       Order of returned items.
 *
 * @apiParamExample {url} Return all posts with related author, comments, and tags.
 * Limit to 10 per page, starting on the first page
 *    https://staging.boldr.io/api/v1/posts?include=[author,tags,comments]&page[size]=10&page[number]=1
 */

/**
 * @apiDefine authHeader
 * @apiHeader {String} Authorization Bearer JSONWEBTOKEN
 * @apiHeaderExample {json} Authorization Header Example:
 *    {
 *      "Authorization": "Bearer JSONWEBTOKEN"
 *    }
 */

/**
 * @apiDefine admin Admin access only
 * You must pass an authorization header with a token associated with an admin user
 * to access this endpoint.
 */

/**
  * @apiDefine user User access for certain restricted routes.
  * You must pass an authorization header with a token to access this endpoint.
  */
