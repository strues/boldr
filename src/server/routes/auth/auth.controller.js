import uuid from 'uuid';
import * as objection from 'objection';
import { mailer, signToken, generateHash } from '../../services';
import { welcomeEmail } from '../../services/mailer/templates';
import User from '../../models/User';
import VerificationToken from '../../models/VerificationToken';

import {
  responseHandler,
  UserNotVerifiedError,
  BadRequest,
  InternalServer,
  Unauthorized,
  Conflict,
} from '../../core';

const debug = require('debug')('boldr:auth-ctrl');

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
  req.assert('firstName', 'First name cannot be blank').notEmpty();

  req.sanitize('email').normalizeEmail({ remove_dots: false });
  req.sanitize('firstName').trim();
  req.sanitize('lastName').trim();

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
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      avatarUrl: req.body.avatarUrl,
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
        userId: user.id,
      });
      if (!verificationEmail) {
        return res.status(500).json('There was a problem with the mailer.');
      }
    });

    // Massive transaction is finished, send the data to the user.
    return responseHandler(res, 201, 'Account created.');
  } catch (error) {
    return next(new BadRequest(error));
  }
}

/**
 * login takes an email address and password, check the database,
 * and issues a JWT.
 * @param req
 * @param res
 * @param next
 */
export async function loginUser(req, res, next) {
  const user = await User.query()
    .where({ email: req.body.email })
    .eager('[roles,socialMedia]')
    .first();
  if (!user) {
    return next(new Unauthorized('Unable to find an account matching the information provided.'));
  }

  if (!user.verified) {
    return next(new UserNotVerifiedError());
  }
  try {
    const validAuth = await user.authenticate(req.body.password);
    if (!validAuth) {
      return next(new Unauthorized('Incorrect login credentials.'));
    }
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

export async function verifyUserRegister(req, res, next) {
  try {
    const token = req.body.token;

    if (!token) {
      return next(new BadRequest('Invalid account verification code'));
    }

    const userToken = await VerificationToken.query().where({ token: req.body.token }).first();

    if (userToken.used === true) {
      return res.status(401).json('This token has already been used.');
    }
    const user = await User.query().patchAndFetchById(userToken.userId, {
      verified: true,
    });

    VerificationToken.query().where({ token: req.body.token }).update({ used: true });

    return responseHandler(res, 201, user);
  } catch (err) {
    return next(new BadRequest(err));
  }
}
export async function checkAuthentication(req, res, next) {
  try {
    const validUser = await User.query().findById(req.user.id).eager('[roles,socialMedia]');

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
