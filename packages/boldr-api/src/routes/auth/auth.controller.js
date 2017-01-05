import passport from 'passport';
import uuid from 'uuid';
import * as objection from 'objection';
import { mailer, signToken } from '../../services/index';
import { welcomeEmail } from '../../services/mailer/templates';
import User from '../user/user.model';
import {
  responseHandler,
  generateHash,
  InternalServer,
  Conflict,
} from '../../core';

const debug = require('debug')('boldrAPI:auth-controller');

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
  req.assert('first_name', 'First name cannot be blank').notEmpty();

  req.sanitize('email').normalizeEmail({ remove_dots: false });
  req.sanitize('first_name').trim();
  req.sanitize('last_name').trim();
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json(errors);
  }

   // the data for the user being created.
  const payload = {
    id: uuid(),
       // no need to hash here, its taken care of on the model instance
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    display_name: req.body.display_name,
    avatar_url: req.body.avatar_url,
  };
  const checkExisting = await User.query().where('email', req.body.email);

  if (checkExisting.length) {
    return next(new Conflict());
  }
  const newUser = await objection.transaction(User, async (User) => {
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
    const verificationEmail = await user.$relatedQuery('tokens')
       .insert({
         user_verification_token: verificationToken,
         user_id: user.id,
       });

    if (!verificationEmail) {
      return next(new InternalServer());
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
  req.assert('email', 'Email is invalid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json(errors);
  }

  await User.query().where({ email: req.body.email }).eager('[roles]').first();
  passport.authenticate('local', (err, user, info) => {
    const error = err || info;
    if (!user) {
      return res.status(401).json({ message: 'Unable to find a matching account.' });
    }
    if (error) {
      return next(new InternalServer());
    }
    if (!user.verified) {
      return res.status(401).json({
        message: 'This account has not been confirmed. Please check your email for a verification link.' });
    }
    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.status(401).json({ message: loginErr });
      // remove the password from the response.
      user.stripPassword();
      // sign the token
      const token = signToken(user);
      req.user = user;
      res.set('Authorization', `Bearer ${token}`);
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
      return res.status(400).json({ message: 'Invalid account verification code' });
    }

    const user = await User.query().where({ user_token: req.params.verifToken }).first();
    await User.query().patchAndFetchById(user.id, { verified: true });

    return responseHandler(res, 201, user);
  } catch (e) {
    return res.status(400).json({ message: e });
  }
}

async function checkAuthentication(req, res, next) {
  try {
    const validUser = await User.query().findById(req.user.id).eager('[roles]');
    if (!validUser) {
      return res.status(404).json({ message: 'Unable to find an account with the given information.' });
    }
    validUser.stripPassword();
    return responseHandler(res, 200, validUser);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

function throwNotFound() {
  const error = new Error();
  error.statusCode = 404;
  throw error;
}

export { register, login, verify, checkAuthentication };
