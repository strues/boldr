import passport from 'passport';

const debug = require('debug')('boldr:auth-ensureAuth');
/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 * @returns {Function} - express middleware
 */
const isAuthenticated = passport.authenticate('jwt', { session: false });

export default isAuthenticated;
