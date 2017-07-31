import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import { wrapRouter } from '../../utils/asyncRouter';
import * as ctrl from './auth.controller';

const router = wrapRouter(new express.Router());

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
