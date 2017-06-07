import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import { wrapRouter } from '../../utils/asyncRouter';
import * as ctrl from './auth.controller';

const router = wrapRouter(new express.Router());

/**
 * @api {post} /auth/login        Login
 * @apiName Login
 * @apiGroup Auth
 * @apiHeader {String} Authorization Bearer {token}
 * @apiParam {String} email User email address
 * @apiParam {String} password User password
 * @apiSuccess (Success 200) {String} token User `token` to
 * be passed to other requests.
 * @apiSuccess (Success 200) {Object} user Current user data
 * @apiError 401 Unable to find a matching account.
 * @apiError 401 This account has not been confirmed. Please
 * check your email for a verification link.
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
 *      "firstName": "Joe",
 *      "lastName": "Gray",
 *      "username": "Joey",
 *      "avatarUrl": "https://boldr.io/images/unknown-avatar.png",
 *      "verified": true,
 *      "role": [{
 *            "id": 3,
 *            "name": "Admin",
 *            "image": null,
 *            "description": "Complete control over the CMS",
 *            "createdAt": "2016-11-21T19:49:59.653Z",
 *            "updatedAt": "2016-11-21T19:49:59.653Z"
 *            }]
 *       }
 *     }
 */
router.post('/login', ctrl.loginUser);

/**
 * @api {post} /auth/signup       Signup
 * @apiName Signup
 * @apiGroup Auth
 * @apiParam {String} email User email address
 * @apiParam {String} password User password
 * @apiParam {String} firstName First name of the user
 * @apiParam {String} lastName Last name of the user
 * @apiParam {String} username The user's display name
 * @apiParam {String} avatarUrl Url for the user's avatar
 * @apiSuccess (Success 201) {Object} user Current user data
 * @apiError 409 Email already exists
 * @apiError 400 Bad request.
 */
router.post('/signup', ctrl.registerUser);

/**
 * @api {get} /auth/check          Authentication check
 * @apiName CheckAuthentication
 * @apiGroup Auth
 * @apiUse authHeader
 * @apiSuccess (Success 200) {Object} user Current user data
 * @apiError 401 Invalid credentials.
 */
router.get('/check', isAuthenticated, ctrl.checkAuthentication);

/**
 * @api {post} /auth/verify      Verify user
 * @apiName verify
 * @apiGroup Auth
 * @apiParam {String} token <VerificationToken>
 * @apiSuccess 201 {Object} user Current user data
 * @apiError 401 Invalid token.
 * @apiError 404 Missing or cannot find the verification token
 */
router.post('/verify', ctrl.verifyUserRegister);

export default router;
