/* @flow */
import type { $Response, $Request, NextFunction } from 'express';
import { NotFound, BadRequest, responseHandler } from '../../core';
import User from './user.model';

const debug = require('debug')('boldr:user-controller');

export async function listUsers(req: $Request, res: $Response, next: NextFunction) {
  const users = await User.query().eager('role').omit(['password']);
  debug(users);
  if (!users) {
    return next(new BadRequest());
  }
  return res.status(200).json(users);
}

export async function getUser(req: $Request, res: $Response, next: NextFunction) {
  const user = await User.query()
  .findById(req.params.id)
  .eager('role')
  .omit(['password']);
  if (!user) return next(new NotFound());
  debug(user);
  return responseHandler(null, res, 200, user);
}

export function updateUser(req: $Request, res: $Response, next: NextFunction) {
  if ('password' in req.body) {
    // $FlowIssue
    req.assert('password', 'Password must be at least 4 characters long').len(4);
  }
  // $FlowIssue
  const errors = req.validationErrors();

  if (errors) {
    return next(new BadRequest(errors));
  }
  if ('role' in req.body) {
    console.log('role in update member');
  }

  return User.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(user => res.status(202).json(user));
}

export async function adminUpdateUser(req: $Request, res: $Response, next: NextFunction) {
  const user = await User.query().findById(req.params.id);
  if (req.body.role) {
    await user.$relatedQuery('role').unrelate();
    await user.$relatedQuery('role').relate({ id: req.body.role });
    delete req.body.role;
  }

  return User.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(user => res.status(202).json(user));
}

export async function destroyUser(req: $Request, res: $Response, next: NextFunction) {
  await User
    .query()
    .findById(req.params.id)
    .then(user => {
      return user.$relatedQuery('tokens').delete();
    });
  await User.query().deleteById(req.params.id);

  return res.status(204).json({ message: 'User deleted.' });
}

export function unlinkUser(req: $Request, res: $Response) {
  const provider = req.query.provider;

  const providers = ['facebook'];
  if (providers.indexOf(provider) === -1) {
    return res.status(404).send('Unknown provider');
  }

  return User.query()
    // $FlowIssue
    .findById(req.user)
    .update({ [provider]: null })
    .then((user) => {
      res.status(200).send(user);
    });
}
