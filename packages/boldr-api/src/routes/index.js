import express from 'express';

import activityRoutes from './activity/activity.routes';
import adminRoutes from './admin/admin.routes';
import attachmentRoutes from './attachment/attachment.routes';
import authRoutes from './auth/auth.routes';
import blockRoutes from './block/block.routes';

import galleryRoutes from './gallery/gallery.routes';
import menuDetailRoutes from './menu/detail/menuDetail.routes';
import menuRoutes from './menu/menu.routes';
import pageRoutes from './page/page.routes';
import postRoutes from './post/post.routes';
import roleRoutes from './role/role.routes';
import s3Router from './s3/s3.routes';
import settingRoutes from './setting/setting.routes';
import tagRoutes from './tag/tag.routes';
import tokenRoutes from './token/token.routes';
import userRoutes from './user/user.routes';

const router = express.Router();

/**
 * @apiDefine listParams
 * @apiParam {String[]} include=[author,tags] Return associated models with the request
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 */

/**
 * @apiDefine authHeader
 * @apiHeader {String}  Authorization   The user's token
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
router.get('/health-check', (req, res) =>
  res.status(200).json('OK, it works'),
);

router.use('/activities', activityRoutes);
router.use('/admin', adminRoutes);
router.use('/attachments', attachmentRoutes);
router.use('/auth', authRoutes);
router.use('/blocks', blockRoutes);
router.use('/galleries', galleryRoutes);
router.use('/menu-details', menuDetailRoutes);
router.use('/menus', menuRoutes);
router.use('/pages', pageRoutes);
router.use('/posts', postRoutes);
router.use('/roles', roleRoutes);
router.use('/s3', s3Router({
  headers: { 'Access-Control-Allow-Origin': '*' }, // optional
  ACL: 'public-read', // this is default
}));
router.use('/settings', settingRoutes);
router.use('/tags', tagRoutes);
router.use('/tokens', tokenRoutes);
router.use('/users', userRoutes);

export default router;
