/**
 * @module initAuth
 * Authentication Middleware
 * server/middleware/initAuth
 *
 */
import authService from '../services/authentication/authService';
import rbac from './rbac';

/**
 * Initialize the authentication middleware.
 *
 * @export
 * @param {any} app the Express app/server object
 */
export default function initAuth(app) {
  app.use(authService);
  app.use(rbac());
}
