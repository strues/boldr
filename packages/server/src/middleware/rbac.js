import { Router } from 'express';
import Account from '../models/Account';

const debug = require('debug')('boldr:server:middleware:rbac');

/**
 * This middleware checks to see if the given user/token combination
 * has the provided role.
 *
 * @param {string} role the role to check
 * @returns {function} middleware function
 */
export function checkPermissions({ role = null }) {
  return (req, res, next) => {
    const { user } = req.session;

    if (role && !hasRole(user, role)) {
      return next(new Error(`User doesn't have required role. '${role}' role is needed.`));
    }
    return next();
  };
}
/**
 * This checks to make sure that the user has a given role.
 *
 * @param {string} role the role to check
 * @returns {function} middleware function
 */
export function checkRole(role = null) {
  return async (req, res, next) => {
    const userInfo = await Account.query()
      .findById(req.session.user.id)
      .eager('[roles]');
    const userRole = userInfo.roles[0].id;
    debug(userRole);
    if (!userRole === role) {
      return res.status(403).json('Forbidden. Your role does not have sufficient privileges.');
    }
    return next();
  };
}

/**
 * This checks to see if the user has the given role.
 *
 * @param {object} user the user object
 * @param {string} role the role
 * @returns {boolean}  whether or not the user has the role
 */
function hasRole(user = null, role = null) {
  return user && role && user.hasRole(role);
}

export default () => {
  const rbac = new Router();

  return rbac;
};
