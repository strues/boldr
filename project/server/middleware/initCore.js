import cookieParser from 'cookie-parser';
import nanoid from 'nanoid';
import bodyParser from 'body-parser';
import config from '@boldr/config';

export default function initCore(app) {
  app.disable('etag');
  app.set('json spaces', 2);
  // attach a unique id to every request.
  app.use((req, res, next) => {
    res.set('Request-Id', nanoid());
    next();
  });
  // Parse cookies via standard express tooling
  app.use(cookieParser(config.get('token.secret')));
  // Parse application/json
  app.use(bodyParser.json({ type: 'application/json' }));
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
}
