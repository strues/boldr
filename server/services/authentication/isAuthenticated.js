import { Unauthorized } from '../../core/errors';
/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 * @returns {Function} - express middleware
 */
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return new Unauthorized();
  }
}

export default isAuthenticated;
