import { Router } from 'express';
import User from '../../modules/user/user.model';
import { GeneralError } from '../errors';

// Middleware usage ... in a route file
// import { checkRole, checkScope } from 'apicore/middleware';
// routes.use(checkRole('admin'));
// router.get('/', checkScope('admin:read'), ctrl.get)

/**
 * This middleware checks to see if the given user/token combination has the provided scope and/or role.
 *
 * @param {string} scope
 * @param {string} role
 * @returns {function}
 */
export function checkPermissions({ scope = null, role = null }) {
  return (req, res, next) => {
    const user = req.user;
    const { token } = req.authInfo;

    if (scope && !hasScope(token, scope)) {
      return next(new GeneralError(`Invalid scope on token. Scope '${scope}' is needed.`));
    }

    if (role && !hasRole(user, role)) {
      return next(new GeneralError(`User doesn't have required role. '${role}' role is needed.`));
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
    // const user = req.user;
    const userInfo = await User.query().findById(req.user.id).eager('role');
    const userRole = userInfo.role[0].name;
    if (!userRole === role) {
      return res.status(403).json('Forbidden. Your role does not have sufficient privileges.');
    }

    return next();
  };
}

/**
 * This checks to make sure that the token has a given scope.
 *
 * @param {string} scope
 * @returns {function}
 */
export function checkScope(scope = null) {
  return (req, res, next) => {
    const { token } = req.authInfo;

    if (!hasScope(token, scope)) {
      return next(new GeneralError(`Invalid scope on token. Scope '${scope}' is needed.`));
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

/**
 * This checks to see if the token has the given scope.
 *
 * @param {OAuthAccessToken} token
 * @param {string} scope
 * @returns {boolean}
 */
function hasScope(token = null, scope = null) {
  return token && scope && token.hasScope(scope);
}

export default () => {
  const middleware = Router();

  return middleware;
};
