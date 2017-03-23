import { Router } from 'express';
import { isAuthenticated } from '../../services/authentication';
import * as ctrl from './auth.controller';

/**
 * @apiDefine AuthGroup
 *
 */
const router = new Router();

/**
 * @api {post} /auth/login        Login
 * @apiName Login
 * @apiGroup AuthGroup
 * @apiHeader {String} Authorization Bearer {token}
 * @apiParam {String} email User email address
 * @apiParam {String} password User password
 * @apiSuccess (Success 200) {String} token User `token` to be passed to other requests.
 * @apiSuccess (Success 200) {Object} user Current user data
 * @apiError 401 Unable to find a matching account.
 * @apiError 401 This account has not been confirmed. Please check your email for a verification link.
 *
 * @apiSuccessExample {json} Success-Response:
 *
 *    HTTP/1.1 200 OK
 *    Vary: Origin
 *    Access-Control-Allow-Credentials: true
 *    {
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYjA",
 *      "user": {
 *      "id": "1b062e26-df71-48ce-b363-4ae9b966e7a0",
 *      "email": "admin@boldr.io",
 *      "first_name": "Joe",
 *      "last_name": "Gray",
 *      "username": "Joey",
 *      "avatar_url": "https://boldr.io/images/unknown-avatar.png",
 *      "verified": true,
 *      "role": [{
 *            "id": 3,
 *            "name": "Admin",
 *            "image": null,
 *            "description": "Complete control over the CMS",
 *            "created_at": "2016-11-21T19:49:59.653Z",
 *            "updated_at": "2016-11-21T19:49:59.653Z"
 *            }]
 *       }
 *     }
 */
router.post('/login', ctrl.loginUser);

/**
 * @api {post} /auth/signup       Signup
 * @apiName Signup
 * @apiGroup AuthGroup
 * @apiParam {String} email User email address
 * @apiParam {String} password User password
 * @apiParam {String} first_name First name of the user
 * @apiParam {String} last_name Last name of the user
 * @apiParam {String} username The user's display name
 * @apiParam {String} avatar_url Url for the user's avatar
 * @apiSuccess (Success 201) {Object} user Current user data
 * @apiError 409 Email already exists
 * @apiError 400 Bad request.
 */
router.post('/signup', ctrl.registerUser);

/**
 * @api {get} /auth/check          Authentication check
 * @apiName CheckAuthentication
 * @apiGroup AuthGroup
 * @apiUse authHeader
 * @apiSuccess (Success 200) {Object} user Current user data
 * @apiError 401 Invalid credentials.
 */
router.get('/check', isAuthenticated, ctrl.checkAuthentication);

/**
 * @api {get} /auth/verification/:verifToken        Verify user
 * @apiName verify
 * @apiGroup AuthGroup
 * @apiParam {String} verification <VerificationToken>
 * @apiSuccess 200 {Object} user Current user data
 * @apiError 401 Invalid token.
 * @apiError 404 Missing or cannot find the verification token
 */
router.get('/verification/:verifToken', ctrl.verifyUser);

export default router;
