import express from 'express';
import * as ctrl from './token.controller';

const router = new express.Router();

/**
 * @api {post} /tokens/forgot-password Send email
 * @apiName forgottenPassword
 * @apiGroup Token
 * @apiParam {String} email Email address to receive the password reset token.
 * @apiParam {String} link Link to redirect user.
 * @apiSuccess (Success 202) 202 Accepted.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.post('/forgot-password', ctrl.forgottenPassword);

/**
 * @api {post} /tokens/reset-password/:token Submit password
 * @apiName resetPassword
 * @apiGroup Token
 * @apiParam {String{6..}} password New account password
 * @apiSuccess {Object} account Account's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Token has expired or doesn't exist.
 */
router.post('/reset-password/:token', ctrl.resetPassword);

export default router;
