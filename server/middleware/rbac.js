import { Router } from 'express';
import User from '../models/User';

const debug = require('debug')('boldr:api:middleware:rbac');
/**
 * This middleware checks to see if the given user/token combination
 * has the provided role.
 *
 * @param {string} role
 * @returns {function}
 */
export function checkPermissions({ role = null }) {
  return (req, res, next) => {
    debug(req);
    const { user } = req;

    if (role && !hasRole(user, role)) {
      return next(new Error(`User doesn't have required role. '${role}' role is needed.`));
    }
    return next();
  };
}
/**
 * This checks to make sure that the user has a given role.
 *
 * @param {string} role
 * @returns {function}
 */
export function checkRole(role = null) {
  return async (req, res, next) => {
    const userInfo = await User.query().findById(req.user.id).eager('[roles]');
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
 * @param {object} user
 * @param {string} role
 * @returns {boolean}
 */
function hasRole(user = null, role = null) {
  return user && role && user.hasRole(role);
}

export default () => {
  const rbac = new Router();

  return rbac;
};
