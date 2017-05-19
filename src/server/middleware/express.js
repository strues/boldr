import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import expressValidator from 'express-validator';
import morgan from 'morgan';
import flash from 'express-flash';
import cors from 'cors';
import responseTime from 'response-time';
import hpp from 'hpp';
import uuid from 'uuid/v4';
import config from '../config';

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
      origin(origin, cb) {
        const whitelist = config.cors.whitelist ? config.cors.whitelist : [];
        cb(null, whitelist.includes(origin));
      },
      credentials: true,
    }),
  );
  app.use((req, res, next) => {
    res.set('Request-Id', uuid());
    next();
  });
  app.use(cookieParser(config.token.secret));
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    app.use(morgan('dev'));
  }
  app.use(compression());

  app.use(bodyParser.json({ type: 'application/json' }));
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    bodyParser.text({ type: 'application/graphql' }),
    (req, res, next) => {
      if (req.is('application/graphql')) {
        req.body = { query: req.body };
      }
      next();
    },
  );
  app.use(expressValidator());
  app.use(
    methodOverride((req, res) => {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method;
        delete req.body._method;
        return method;
      }
    }),
  );
  app.use(responseTime());
  app.use(hpp());
  app.use((err, req, res, next) => {
    if (err && (!next || res.headersSent)) {
      return;
    }
    res.sendStatus(500);
  });
  app.use(flash());
};
