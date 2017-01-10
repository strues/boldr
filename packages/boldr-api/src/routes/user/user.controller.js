/* @flow */
import type { $Response, $Request, NextFunction } from 'express';
import { NotFound, BadRequest, responseHandler } from '../../core';
import User from './user.model';

const debug = require('debug')('boldrAPI:user-controller');

export async function listUsers(req: $Request, res: $Response, next: NextFunction) {
  try {
    const users = await User.query().eager('[roles]').omit(['password']);
    debug(users);
    if (!users) {
      const err = new NotFound();
      return next(err);
    }
    return responseHandler(res, 200, users);
  } catch (error) {
    const err = new BadRequest(error);
    return next(err);
  }
}

export async function getUser(req: $Request, res: $Response, next: NextFunction) {
  try {
    const user = await User.query()
    .findById(req.params.id)
    .eager('[roles]')
    .omit(['password']);

    return responseHandler(res, 200, user);
  } catch (error) {
    const err = new BadRequest(error);
    return next(err);
  }
}

export function updateUser(req: $Request, res: $Response, next: NextFunction) {
  // $FlowIssue
  if ('password' in req.body) {
    // $FlowIssue
    req.assert('password', 'Password must be at least 4 characters long').len(4);
  }
  // $FlowIssue
  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).json(errors);
  }

  return User.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(user => res.status(202).json(user));
}

export async function adminUpdateUser(req: $Request, res: $Response, next: NextFunction) {
  try {
    if (req.body.role) {
      const u = await User.query().findById(req.params.id).eager('roles');
      await u
         .$relatedQuery('roles')
         .unrelate();

      const newRole = await u.$relatedQuery('roles').relate({ id: req.body.role });

      debug(newRole);
    }
    const payload = {
      display_name: req.body.display_name,
      bio: req.body.bio,
      // role: req.body.role,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      avatar_url: req.body.avatar_url,

    };
    User.query()
      .patchAndFetchById(req.params.id, payload)
      .then(user => res.status(202).json(user));
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function destroyUser(req: $Request, res: $Response, next: NextFunction) {
  try {
    await User
      .query()
      .findById(req.params.id)
      .then(user => {
        return user.$relatedQuery('tokens').delete();
      });
    await User.query().deleteById(req.params.id);

    return res.status(204).json({ message: 'User deleted.' });
  } catch (error) {
    return res.status(500).json(error);
  }
}
