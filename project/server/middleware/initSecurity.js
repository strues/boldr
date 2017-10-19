import helmet from 'helmet';
import hpp from 'hpp';
import uuid from 'uuid';
import cors from 'cors';
import ms from 'ms';

/**
 * Initialize security middleware
 *
 * @export
 * @param {any} app
 * @param {any} { enableNonce = true, enableCSP = false, hstsMA = '90 days' }
 */
export default function initSecurity(app) {
  app.set('trust proxy', true);

  // Don't expose any software information to hackers.
  app.disable('x-powered-by');

  // enable CORS - Cross Origin Resource Sharing
  // allow for sending credentials (auth token) in the headers.
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
  // Prevent HTTP Parameter pollution.
  app.use(hpp());
}
