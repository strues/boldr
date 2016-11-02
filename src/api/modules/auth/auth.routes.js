import express from 'express';
import passport from 'passport';
import isAuthenticated from '../../core/authentication/isAuthenticated';
import User from '../user/user.model';
import configureLocalPassport from './providers/local';
import configureJwt from './providers/jwt';
// import configureGithub from './providers/github';
// import configureFacebook from './providers/facebook';
import * as ctrl from './auth.controller';

const debug = require('debug')('boldr:auth:routes');


passport.serializeUser((user, done) => {
  const sessionUser = { id: user.id, email: user.email };
  debug(sessionUser, 'sessionUser - auth routes');
  return done(null, sessionUser);
});

passport.deserializeUser((sessionUser, done) => {
  debug(sessionUser);
  done(null, sessionUser);
});

configureLocalPassport(User);
configureJwt(User);
// configureGithub(User);
// configureFacebook(User);

const router = express.Router();

/**
 * @api {post} /auth/login Login
 * @apiName Login
 * @apiGroup Auth
 * @apiHeader {String} Authorization {token}
 * @apiParam {String} email User email address
 * @apiParam {String} password User password
 * @apiSuccess (Success 200) {String} token User `token` to be passed to other requests.
 * @apiSuccess (Success 200) {Object} user Current user data
 * @apiError 401 Invalid credentials.
 */
router.post('/login', ctrl.login);

/**
 * @api {post} /auth/signup Signup
 * @apiName Signup
 * @apiGroup Auth
 * @apiParam {String} email User email address
 * @apiParam {String} password User password
 * @apiParam {String} first_name First name of the user
 * @apiParam {String} last_name Last name of the user
 * @apiParam {String} display_name The user's display name
 * @apiParam {String} location City/State where the user is located
 * @apiParam {String} website Personal website belonging to the user
 * @apiParam {String} avatar_url Url for the user's avatar
 * @apiParam {String} bio Information about the user
 * @apiParam {String} facebook_profile Url to the user's facebook profile
 * @apiParam {String} github_profile Url to the user's github profile
 * @apiParam {String} twitter_profile Url to the user's twitter profile
 * @apiParam {String} google_profile Url to the user's google profile
 * @apiSuccess (Success 201) {Object} user Current user data
 * @apiError 401 Invalid credentials.
 * @apiError 409 Email already exists
 * @apiError 400 Bad request.
 */
router.post('/signup', ctrl.register);

/**
 * @api {get} /auth/check Check
 * @apiName checkAuthentication
 * @apiGroup Auth
 * @apiHeader {String} Authorization Token
 * @apiSuccess (Success 200) {Object} user Current user data
 * @apiError 401 Invalid credentials.
 */
router.get('/check', isAuthenticated, ctrl.checkAuthentication);

/**
 * @api {get} /auth/verification/:verifToken Verify
 * @apiName verify
 * @apiGroup Auth
 * @apiParam {String} verification {token}
 * @apiSuccess 200 {Object} user Current user data
 * @apiError 404 Missing or cannot find the verification token
 */
router.get('/verification/:verifToken', ctrl.verify);

/**
 * @api {get} /auth/github Initiate GitHub OAuth
 * @apiName github
 * @apiGroup Auth
 * @apiSuccess 301 redirect back to the app
 * @apiError 404 Missing or cannot find the verification token
 */
// router.get('/github', passport.authenticate('github'));
/**
 * @api {get} /auth/github/callback GitHub Callback
 * @apiName githubCallback
 * @apiGroup Auth
 * @apiSuccess  301 redirect back to the app
 * @apiError 404 Missing or cannot find the verification token
 */
// router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect(req.session.returnTo || '/');
// });

/**
 * @api {get} /auth/facebook Initiate Facebook OAuth
 * @apiName facebook
 * @apiGroup Auth
 * @apiSuccess 301 redirect back to the app
 * @apiError 404 Missing or cannot find the verification token
 */
// router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));

/**
 * @api {get} /auth/facebook/callback Facebook Callback
 * @apiName facebookCallback
 * @apiGroup Auth
 * @apiSuccess 301 redirect back to the app
 * @apiError 404 Missing or cannot find the verification token
 */
// router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect(req.session.returnTo || '/');
// });

export default router;
