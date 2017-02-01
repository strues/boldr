import uuid from 'uuid';
import * as objection from 'objection';
import { mailer, signToken } from '../../services/index';
import { welcomeEmail } from '../../services/mailer/templates';
import { User, Activity, Token } from '../../models';
import {
  responseHandler,
  generateHash,
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
  try {
    // Param validation
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.assert('first_name', 'First name cannot be blank').notEmpty();

    req.sanitize('email').normalizeEmail({ remove_dots: false });
    req.sanitize('first_name').trim();
    req.sanitize('last_name').trim();
    const errors = req.validationErrors();
    if (errors) {
      return next(new BadRequest(errors));
    }

    // the data for the user being created.
    const payload = {
      id: uuid(),
      // no need to hash here, its taken care of on the model instance
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      avatar_url: req.body.avatar_url,
    };
    const checkExisting = await User.query().where('email', req.body.email);

    if (checkExisting.length) {
      return next(new Conflict());
    }
    const newUser = await objection.transaction(User, async User => {
      const user = await User.query().insert(payload);
      await user.$relatedQuery('roles').relate({ id: 1 });

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
      mailer(user, mailBody, mailSubject);
      // create a relationship between the user and the token
      const verificationEmail = await user
        .$relatedQuery('tokens')
        .insert({ user_verification_token: verificationToken, user_id: user.id });
      if (!verificationEmail) {
        return next(new InternalServer());
      }
    });
    await Activity
      .query()
      .insert({
        id: uuid(),
        user_id: payload.id,
        action_type_id: 4,
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
  try {
    req.assert('email', 'Email is invalid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    const errors = req.validationErrors();
    if (errors) {
      return next(new BadRequest(errors));
    }

    const user = await User
      .query()
      .where({ email: req.body.email })
      .eager('[roles]')
      .first();

    if (!user) {
      return next(new Unauthorized(
        'Unable to find a user matching the provided credentials.',
      ));
    }

    if (!user.verified) {
      return next(new UserNotVerifiedError());
    }
    const validAuth = await user.authenticate(req.body.password);
    if (!validAuth) return next(new Unauthorized());
    // remove the password from the response.
    user.stripPassword();
    // sign the token
    const token = signToken(user);
    req.user = user;
    res.set('Authorization', `Bearer ${token}`);
    // req.role = user.role[0].id;
    return res.json({ token, user });
  } catch (error) {
    return next(new BadRequest(error));
  }
}

export async function verifyUser(req, res, next) {
  try {
    const verifToken = req.params.verifToken;

    if (!verifToken) {
      return next(new BadRequest('Invalid account verification code'));
    }

    const token = await Token
      .query()
      .where({ user_verification_token: req.params.verifToken })
      .first();

    const user = await User
      .query()
      .patchAndFetchById(token.user_id, { verified: true });

    return responseHandler(res, 201, user);
  } catch (err) {
    return next(new BadRequest(err));
  }
}

export async function checkAuthentication(req, res, next) {
  try {
    const validUser = await User.query().findById(req.user.id).eager('[roles]');

    if (!validUser) {
      return next(new Unauthorized(
        'Unable to find an account with the given information.',
      ));
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
