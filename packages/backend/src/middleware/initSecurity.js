import helmet from 'helmet';
import hpp from 'hpp';
import uuid from 'uuid';
import cors from 'cors';

/**
 * Initialize security middleware
 *
 * @export
 * @param {any} app
 * @param {any} { enableNonce = true, enableCSP = false, hstsMA = '90 days' }
 */
export default function initSecurity(app, { enableNonce = true, enableCSP = false }) {
  if (enableNonce) {
    /* eslint-disable max-params */

    // Attach a unique "nonce" to every response. This allows use to declare
    // inline scripts as being safe for execution against our content security policy.
    // @see https://helmetjs.github.io/docs/csp/
    app.use((request, response, next) => {
      response.locals.nonce = uuid.v4();
      next();
    });
  }
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

  // The xssFilter middleware sets the X-XSS-Protection header to prevent
  // reflected XSS attacks.
  // @see https://helmetjs.github.io/docs/xss-filter/
  app.use(helmet.xssFilter());

  // Frameguard mitigates clickjacking attacks by setting the X-Frame-Options header.
  // We disable this for embedding
  // @see https://helmetjs.github.io/docs/frameguard/
  app.use(helmet.frameguard('false'));

  // Sets the X-Download-Options to prevent Internet Explorer from executing
  // downloads in your site’s context.
  // @see https://helmetjs.github.io/docs/ienoopen/
  app.use(helmet.ieNoOpen());

  // Don’t Sniff Mimetype middleware, noSniff, helps prevent browsers from trying
  // to guess (“sniff”) the MIME type, which can have security implications. It
  // does this by setting the X-Content-Type-Options header to nosniff.
  // @see https://helmetjs.github.io/docs/dont-sniff-mimetype/
  app.use(helmet.noSniff());
}
