import uuid from 'uuid';
import * as objection from 'objection';
import { mailer, signToken, generateHash } from '../../services';
import { welcomeEmail } from '../../services/mailer/templates';
import { User, Activity, VerificationToken } from '../../models';
import {
  responseHandler,
  UserNotVerifiedError,
  BadRequest,
  InternalServer,
  Unauthorized,
  Conflict,
} from '../../core';

const debug = require('debug')('boldrAPI:auth-ctrl');

/**
 * register creates a new user in the database.
 * @param req
 * @param res
 * @returns {*}
 */
export async function registerUser(req, res, next) {
  // Param validation
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.assert('first_name', 'First name cannot be blank').notEmpty();

  req.sanitize('email').normalizeEmail({ remove_dots: false });
  req.sanitize('first_name').trim();
  req.sanitize('last_name').trim();

  const checkExisting = await User.query().where('email', req.body.email);

  if (checkExisting.length) {
    return res.status(409).json('An account matching this email already exists.');
  }

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json(errors);
  }

  try {
    // the data for the user being created.
    const payload = {
      id: uuid.v4(),
      // no need to hash here, its taken care of on the model instance
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      avatar_url: req.body.avatar_url,
    };

    const newUser = await objection.transaction(User, async User => {
      const user = await User.query().insert(payload);
      await user.$relatedQuery('roles').relate({ id: 1 });

      if (!user) {
        throwNotFound();
      }
      // generate user verification token to send in the email.
      const verifToken = uuid.v4();
      // get the mail template
      const mailBody = welcomeEmail(verifToken);
      // subject
      const mailSubject = 'Boldr User Verification';
      // send the welcome email
      mailer(user, mailBody, mailSubject);
      // create a relationship between the user and the token
      const verificationEmail = await user.$relatedQuery('verificationToken').insert({
        ip: req.ip,
        token: verifToken,
        user_id: user.id,
      });
      if (!verificationEmail) {
        return res.status(500).json('There was a problem with the mailer.');
      }
    });
    await Activity.query().insert({
      id: uuid.v4(),
      user_id: payload.id,
      type: 'register',
      activity_user: payload.id,
    });
    // Massive transaction is finished, send the data to the user.
    return responseHandler(res, 201, newUser);
  } catch (error) {
    return next(new BadRequest(error));
  }
}

/**
 * login takes an email address and password, check the database, and issues a JWT.
 * @param req
 * @param res
 * @param next
 */
export async function loginUser(req, res, next) {
  const user = await User.query().where({ email: req.body.email }).eager('[roles]').first();

  if (!user) {
    return next(new Unauthorized('Unable to find a user matching the provided credentials.'));
  }

  if (!user.verified) {
    return next(new UserNotVerifiedError());
  }
  try {
    const validAuth = await user.authenticate(req.body.password);
    if (!validAuth) return res.status(401).json('Unauthorized. Please try again.');
    // remove the password from the response.
    user.stripPassword();
    // sign the token
    const token = signToken(user);
    req.user = user;
    res.set('Authorization', `Bearer ${token}`);
    // req.role = user.role[0].id;
    return res.json({
      token,
      user,
    });
  } catch (error) {
    return next(new BadRequest(error));
  }
}

export async function verifyUser(req, res, next) {
  try {
    const { verifToken } = req.params;

    if (!verifToken) {
      return next(new BadRequest('Invalid account verification code'));
    }

    const token = await VerificationToken.query().where({ token: req.params.verifToken }).first();

    if (token.used === true) {
      return res.status(401).json('This token has already been used.');
    }
    const user = await User.query().patchAndFetchById(token.user_id, { verified: true });

    await VerificationToken.query().where({ token: req.params.verifToken }).update({ used: true });

    return responseHandler(res, 201, user);
  } catch (err) {
    return next(new BadRequest(err));
  }
}

export async function checkAuthentication(req, res, next) {
  try {
    const validUser = await User.query().findById(req.user.id).eager('[roles]');

    if (!validUser) {
      return res.status(401).json('Unauthorized: Please login again.');
    }
    validUser.stripPassword();
    return responseHandler(res, 200, validUser);
  } catch (error) {
    return next(new BadRequest(error));
  }
}

function throwNotFound() {
  const error = new Error();
  error.statusCode = 404;
  throw error;
}
