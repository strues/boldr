import config from '../config';
// import articleRoutes from './article/article.routes';
// import attachmentRoutes from './attachment/attachment.routes';
import authRoutes from './auth/auth.routes';
// import mediaRoutes from './media/media.routes';
// import menuDetailRoutes from './menu/detail/menuDetail.routes';
// import menuRoutes from './menu/menu.routes';
// import roleRoutes from './role/role.routes';
// import settingRoutes from './setting/setting.routes';
// import tagRoutes from './tag/tag.routes';
import tokenRoutes from './token/token.routes';
import userRoutes from './user/user.routes';

const API_PREFIX = config.server.prefix;

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
  app.use(`${API_PREFIX}/auth`, authRoutes);
  app.use(`${API_PREFIX}/tokens`, tokenRoutes);
  app.use(`${API_PREFIX}/users`, userRoutes);
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
 * @apiHeader (Authorization) {String} Authorization    A JWT retrieved from logging in.
 * @apiHeaderExample AuthHeader (example):
 *      "Authorization": "Bearer eyJhbGciOiJIUzI1NiI"
 */

/**
 * @apiDefine admin   Admin access only
 * You must pass an authorization header with a token associated with an admin user
 * to access this endpoint.
 */

/**
  * @apiDefine user   User access for certain restricted routes.
  * You must pass an authorization header with a token to access this endpoint.
  */

/**
 * @apiDefine UnauthorizedError
 * @apiError 401    Unauthorized
 * @apiErrorExample Unauthorized (example):
 *     HTTP/1.1 401 Unauthorized
 *     "The request requires user authentication. Please try again with the correct authorization header"
 */

/**
  * @apiDefine NotFoundError
  * @apiError 404    Not Found
  * @apiErrorExample NotFound (example):
  *     HTTP/1.1 404 Not Found
  *     "Unable to find what you were looking for. Please try the request again."
  */

/**
 * @apiDefine MissingUserFields
 * @apiError 400    Bad Request: MissingUserFields
 * @apiErrorExample MissingUserFields (example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *      "username": [{
 *          "message":"should have required property 'username'",
 *          "keyword":"required",
 *          "params": {
 *            "missingProperty":"username"
 *           }
 *         }],
 *      "password": [{
 *          "message":"should have required property 'password'",
 *          "keyword":"required",
 *          "params": {
 *            "missingProperty":"password"
 *          }
 *       }]
 *     }
 */
