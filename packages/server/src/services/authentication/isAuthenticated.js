/* eslint-disable consistent-return */
/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 * @returns {Function} - express middleware
 */
module.exports = function isAuthenticated(req, res, next) {
  // $FlowIssue
  if (req.isAuthenticated()) {
    next();
  } else {
    return next(new Error('Request is not authenticated.'));
  }
};
