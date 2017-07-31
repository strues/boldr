import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import hpp from 'hpp';
import uuid from 'uuid';
import config from '../config';

function nonceMiddleware(req, res, next) {
  res.locals.nonce = uuid.v4(); // eslint-disable-line no-param-reassign
  return next();
}

export default app => {
  app.disable('x-powered-by');
  app.set('trust proxy', 'loopback');
  app.use(nonceMiddleware);
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
  app.set('json spaces', 2);
  app.use(cookieParser(config.token.secret));
  app.use(bodyParser.json({ type: 'application/json' }));
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text({ type: 'application/graphql' }), (req, res, next) => {
    if (req.is('application/graphql')) {
      req.body = { query: req.body };
    }
    next();
  });
};
