
/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 * @returns {Function} - express middleware
 */
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}

export default isAuthenticated;
