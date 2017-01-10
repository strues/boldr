'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authentication = require('../../services/authentication');

var _token = require('./token.controller');

var ctrl = _interopRequireWildcard(_token);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express2.default.Router();

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

exports.default = router;