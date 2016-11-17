import passport from 'passport';
import uuid from 'node-uuid';
import * as objection from 'objection';
import handleMail from '../../mailer';
import { welcomeEmail } from '../../mailer/templates';
import User from '../user/user.model';
import {
  responseHandler,
  generateHash,
  InternalServer,
  NotFound,
  BadRequest,
  Conflict,
  UserNotVerifiedError,
  signToken,
} from '../../core';

const debug = require('debug')('boldr:auth:controller');

/**
 * register creates a new user in the database.
 * @param req
 * @param res
 * @returns {*}
 */
async function register(req, res, next) {
    // Param validation
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();
  if (errors) {
    return next(new BadRequest());
  }

    // the data for the user being created.
  const userInfo = {
    id: uuid.v4(),
      // no need to hash here, its taken care of on the model instance
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    display_name: req.body.display_name,
    avatar_url: req.body.avatar_url,
    location: req.body.location,
    bio: req.body.bio,
    website: req.body.website,
    profile_image: req.body.profile_image,
    birthday: req.body.birthday,
    facebook_profile: req.body.facebook_profile,
    linkedin_profile: req.body.linkedin_profile,
    github_profile: req.body.github_profile,
    google_profile: req.body.google_profile,
    twitter_profile: req.body.twitter_profile,
  };
  const checkExisting = await User.query().where('email', req.body.email);
  debug(checkExisting);
  if (checkExisting.length) {
    return next(new Conflict());
  }
  const newUser = await objection.transaction(User, async (User) => {
    const user = await User
        .query()
        .insert(userInfo);
    await user.$relatedQuery('role').relate({ id: 1 });

    if (!user) {
      throwNotFound();
    }
    // generate user verification token to send in the email.
    const verificationToken = await generateHash();
    // get the mail template
    const mailBody = await welcomeEmail(verificationToken);
    // subject
    const mailSubject = 'Boldr User Verification';
    // send the welcome email
    handleMail(user, mailBody, mailSubject);
    // create a relationship between the user and the token
    const verificationEmail = await user.$relatedQuery('tokens')
      .insert({
        user_verification_token: verificationToken,
        user_id: user.id,
      });

    if (!verificationEmail) {
      throwNotFound();
    }
  });
  // Massive transaction is finished, send the data to the user.
  return responseHandler(res, 201, newUser);
}

/**
 * login takes an email address and password, check the database, and issues a JWT.
 * @param req
 * @param res
 * @param next
 */
async function login(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  await User.query().where({ email: req.body.email }).eager('role').first();
  passport.authenticate('local', (err, user, info) => {
    const error = err || info;
    if (error) {
      return next(new InternalServer());
    }
    if (!user) {
      return next(new NotFound());
    }
    if (!user.verified) {
      return next(new UserNotVerifiedError());
    }
    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.status(401).json({ message: loginErr });
      // remove the password from the response.
      user.stripPassword();
      // sign the token
      const token = signToken(user);
      req.user = user;
      res.set('authorization', signToken(user));
      // req.role = user.role[0].id;
      debug(req.session);
      return res.json({ token, user });
    });
  })(req, res, next);
}


async function verify(req, res, next) {
  try {
    const verifToken = req.params.verifToken;

    if (!verifToken) {
      return res.status(400).json('Invalid registration link');
    }

    const user = await User.query().where({ user_token: req.params.verifToken }).first();
    await User.query().patchAndFetchById(user.id, { verified: true });

    return responseHandler(res, 201, user);
  } catch (e) {
    return next(new InternalServer());
  }
}

async function checkAuthentication(req, res, next) {
  try {
    const validUser = await User.query().findById(req.user.id).eager('role');
    if (!validUser) {
      return next(new NotFound());
    }
    validUser.stripPassword();
    return responseHandler(res, 200, validUser);
  } catch (error) {
    return next(new InternalServer());
  }
}

function throwNotFound() {
  const error = new Error();
  error.statusCode = 404;
  throw error;
}

export { register, login, verify, checkAuthentication };
