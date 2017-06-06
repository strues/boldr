import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import hpp from 'hpp';
import uuid from 'uuid/v4';
import config from '../config';

export default app => {
  app.disable('x-powered-by');
  app.set('trust proxy', 'loopback');
  // enable CORS - Cross Origin Resource Sharing
  // allow for sending credentials (auth token) in the headers.
  app.use(
    cors({
      origin(origin, cb) {
        const whitelist = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];
        cb(null, whitelist.includes(origin));
      },
      credentials: true,
    }),
  );
  app.use((req, res, next) => {
    res.set('Request-Id', uuid());
    next();
  });
  app.set('json spaces', 2);

  app.use(cookieParser(config.token.secret));
  if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
  }
  app.use(bodyParser.json({ type: 'application/json' }));
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text({ type: 'application/graphql' }), (req, res, next) => {
    if (req.is('application/graphql')) {
      req.body = { query: req.body };
    }
    next();
  });
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
  app.use(hpp());
  app.use((err, req, res, next) => {
    if (err && (!next || res.headersSent)) {
      return;
    }
    res.sendStatus(500);
  });
};
