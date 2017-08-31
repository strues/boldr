import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import uuid from 'uuid';
import bodyParser from 'body-parser';
import getConfig from '@boldr/config';

const config = getConfig();

export default function initCore(app) {
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use((req, res, next) => {
    res.set('Request-Id', uuid.v4());
    next();
  });
  app.disable('etag');
  app.set('json spaces', 2);
  // Parse cookies via standard express tooling
  app.use(cookieParser(config.server.token.secret));
  // Parse application/json
  app.use(bodyParser.json({ type: 'application/json' }));
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
}
