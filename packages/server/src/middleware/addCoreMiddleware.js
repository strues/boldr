import shrinkRay from 'shrink-ray';
import createLocaleMiddleware from 'express-locale';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

export default function addCoreMiddleware(server, { locale }) {
  // Parse cookies via standard express tooling
  server.use(cookieParser());

  // Detect client locale and match it with configuration
  server.use(
    createLocaleMiddleware({
      priority: ['query', 'cookie', 'accept-language', 'default'],
      default: locale.default.replace(/-/, '_'),
      allowed: locale.supported.map(entry => entry.replace(/-/, '_')),
    }),
  );

  // Parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: false }));

  // Parse application/json
  server.use(bodyParser.json());

  // Advanced response compression using a async zopfli/brotli combination
  // https://github.com/aickin/shrink-ray
  server.use(shrinkRay());
}
