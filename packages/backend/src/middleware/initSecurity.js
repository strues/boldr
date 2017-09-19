import helmet from 'helmet';
import hpp from 'hpp';
import uuid from 'uuid';
import cors from 'cors';

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

  // Content Security Policy (CSP)
  //
  // If you are unfamiliar with CSPs then I highly recommend that you do some
  // reading on the subject:
  //  - https://content-security-policy.com/
  //  - https://developers.google.com/web/fundamentals/security/csp/
  //  - https://developer.mozilla.org/en/docs/Web/Security/CSP
  //  - https://helmetjs.github.io/docs/csp/
  //
  // If you are relying on scripts/styles/assets from other servers (internal or
  // external to your company) then you will need to explicitly configure the
  // CSP below to allow for this.  For example you can see I have had to add
  // the polyfill.io CDN in order to allow us to use the polyfill script.
  // It can be a pain to manage these, but it's a really great habit to get in
  // to.
  //
  // You may find CSPs annoying at first, but it is a great habit to build.
  // The CSP configuration is an optional item for helmet, however you should
  // not remove it without making a serious consideration that you do not require
  // the added security.
  // const cspConfig = enableCSP
  //   ? {
  //       directives: {
  //         defaultSrc: ["'self'"],

  //         scriptSrc: [
  //           // Allow scripts hosted from our application.
  //           "'self'",

  //           // Note: We will execution of any inline scripts that have the following
  //           // nonce identifier attached to them.
  //           // This is useful for guarding your application whilst allowing an inline
  //           // script to do data store rehydration (redux/mobx/apollo) for example.
  //           // @see https://helmetjs.github.io/docs/csp/
  //           (request, response) => `'nonce-${response.locals.nonce}'`,

  //           // Required for eval-source-maps (devtool in webpack)
  //           process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : '',
  //         ].filter(value => value !== ''),

  //         styleSrc: ["'self'", "'unsafe-inline'", 'blob:'],
  //         imgSrc: ["'self'", 'data:'],
  //         fontSrc: ["'self'", 'data:'],

  //         // Note: Setting this to stricter than * breaks the service worker. :(
  //         // I can't figure out how to get around this, so if you know of a safer
  //         // implementation that is kinder to service workers please let me know.
  //         // ["'self'", 'ws:'],
  //         connectSrc: ['*'],

  //         // objectSrc: [ "'none'" ],
  //         // mediaSrc: [ "'none'" ],

  //         childSrc: ["'self'"],
  //       },
  //     }
  //   : null;

  // if (enableCSP) {
  //   app.use(helmet.contentSecurityPolicy(cspConfig));
  // }

  // // The xssFilter middleware sets the X-XSS-Protection header to prevent
  // // reflected XSS attacks.
  // // @see https://helmetjs.github.io/docs/xss-filter/
  app.use(helmet.xssFilter());

  // // Frameguard mitigates clickjacking attacks by setting the X-Frame-Options header.
  // // We disable this for embedding
  // // @see https://helmetjs.github.io/docs/frameguard/
  app.use(helmet.frameguard('false'));

  // // Sets the X-Download-Options to prevent Internet Explorer from executing
  // // downloads in your site’s context.
  // // @see https://helmetjs.github.io/docs/ienoopen/
  app.use(helmet.ieNoOpen());

  // // Don’t Sniff Mimetype middleware, noSniff, helps prevent browsers from trying
  // // to guess (“sniff”) the MIME type, which can have security implications. It
  // // does this by setting the X-Content-Type-Options header to nosniff.
  // // @see https://helmetjs.github.io/docs/dont-sniff-mimetype/
  app.use(helmet.noSniff());
}
