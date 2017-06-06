import uuid from 'uuid';
import * as objection from 'objection';
import { mailer, signToken, generateHash } from '../../services/index';
import { welcomeEmail } from '../../services/mailer/templates';
import VerificationToken from '../../models/VerificationToken';
import {
  responseHandler,
  UserNotVerifiedError,
  NotFound,
  BadRequest,
  InternalServer,
  Unauthorized,
  Conflict,
} from '../../core';
import User from '../../models/User';

const debug = require('debug')('boldr:user-ctrl');

export async function getUser(req, res, next) {
  try {
    const user = await User.query()
      .findById(req.params.id)
      .eager('[roles,socialMedia]')
      .omit(['password']);

    return responseHandler(res, 200, user);
  } catch (error) {
    /* istanbul ignore next */
    const err = new BadRequest(error);
    return next(err);
  }
}

export async function getUsername(req, res, next) {
  try {
    const user = await User.query()
      .where({ username: req.params.username })
      .eager('[roles,socialMedia]')
      .omit(['password'])
      .first();

    return responseHandler(res, 200, user);
  } catch (error) {
    /* istanbul ignore next */
    const err = new BadRequest(error);
    return next(err);
  }
}

export function updateUser(req, res, next) {
  if ('password' in req.body) {
    req
      .assert('password', 'Password must be at least 4 characters long')
      .len(4);
  }
  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).json(errors);
  }

  return User.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(user => res.status(202).json(user));
}

export async function adminUpdateUser(req, res, next) {
  try {
    if (req.body.role) {
      /* istanbul ignore next */
      const u = await User.query().findById(req.params.id).eager('roles');
      await u.$relatedQuery('roles').unrelate();
      /* istanbul ignore next */
      const newRole = await u
        .$relatedQuery('roles')
        .relate({ id: req.body.role });
    }
    const payload = {
      username: req.body.username,
      bio: req.body.bio,
      // role: req.body.role,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      avatarUrl: req.body.avatarUrl,
    };
    User.query()
      .patchAndFetchById(req.params.id, payload)
      .eager('[roles,socialMedia]')
      .then(user => res.status(202).json(user));
  } catch (error) {
    /* istanbul ignore next */
    return next(error);
  }
}

export async function destroyUser(req, res, next) {
  const requestedUser = await User.query().findById(req.params.id);
  if (!requestedUser) {
    return next(new NotFound());
  }
  try {
    requestedUser.$relatedQuery('roles').delete();
    requestedUser.$relatedQuery('socialMedia').delete();
    await User.query().deleteById(req.params.id);

    return res.status(204).json({ message: 'User deleted.' });
  } catch (error) {
    /* istanbul ignore next */
    return next(error);
  }
}

export async function adminCreateUser(req, res, next) {
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
    const checkExisting = await User.query().where('email', req.body.email);

    if (checkExisting.length) {
      /* istanbul ignore next */
      return next(new Conflict());
    }
    const newUser = await objection.transaction(User, async User => {
      const user = await User.query().insert(payload);
      if (!user) {
        /* istanbul ignore next */
        return next(new NotFound());
      }
      await user.$relatedQuery('roles').relate({ id: 1 });

      // generate user verification token to send in the email.
      const verificationToken = generateHash();
      // get the mail template
      const mailBody = welcomeEmail(verificationToken);
      // subject
      const mailSubject = 'Boldr User Verification';
      // send the welcome email
      mailer(user, mailBody, mailSubject);
      // create a relationship between the user and the token
      const verificationEmail = await user
        .$relatedQuery('verificationToken')
        .insert({
          ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
          token: verificationToken,
          userId: user.id,
        });

      if (!verificationEmail) {
        return next(new InternalServer());
      }
    });
    // Massive transaction is finished, send the data to the user.
    return responseHandler(res, 201, newUser);
  } catch (error) {
    /* istanbul ignore next */
    return next(error);
  }
}
