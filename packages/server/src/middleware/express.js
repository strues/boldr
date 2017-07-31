import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
// import hpp from 'hpp';
import uuid from 'uuid';
import { config } from '../config';

export default app => {
  app.disable('x-powered-by');
  app.set('trust proxy', 'loopback');
  // enable CORS - Cross Origin Resource Sharing
  // allow for sending credentials (auth token) in the headers.
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
  app.use((req, res, next) => {
    res.set('Request-Id', uuid.v4());
    next();
  });
  app.disable('etag');
  // disable cache for all requests: https://github.com/helmetjs/nocache
  app.use(helmet.noCache());
  app.set('json spaces', 2);
  app.use(cookieParser(config.get('token.secret')));
  app.use(bodyParser.json({ type: 'application/json' }));
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use((err, req, res, next) => {
    if (err && (!next || res.headersSent)) {
      return;
    }
    return res.status(500);
  });
};
