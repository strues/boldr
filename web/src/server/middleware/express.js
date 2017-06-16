import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';
import uuid from 'uuid';
import morgan from 'morgan';

function nonceMiddleware(req, res, next) {
  res.locals.nonce = uuid.v4(); // eslint-disable-line no-param-reassign
  next();
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
  app.use((req, res, next) => {
    res.set('Request-Id', uuid.v4());
    next();
  });
  app.set('json spaces', 2);

  app.use(compression());
  app.use(bodyParser.json({ type: 'application/json' }));
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text({ type: 'application/graphql' }), (req, res, next) => {
    if (req.is('application/graphql')) {
      req.body = { query: req.body };
    }
    next();
  });
  app.use((err, req, res, next) => {
    if (err && (!next || res.headersSent)) {
      return;
    }
    res.sendStatus(500);
  });
};
