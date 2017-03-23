/* @flow */
import type { $Response, $Request, NextFunction } from 'express';
/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 * @returns {Function} - express middleware
 */

function isAuthenticated(req: $Request, res: $Response, next: NextFunction) {
  // $FlowIssue
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).json('Unauthorized. Please login and try again.');
  }
}

export default isAuthenticated;
