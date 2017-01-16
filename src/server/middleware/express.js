import cors from 'cors';
import uuid from 'uuid';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import expressValidator from 'express-validator';
import morgan from 'morgan';
import hpp from 'hpp';
import config from '../../../config';

// Attach a unique "nonce" to every response.  This allows use to declare
// inline scripts as being safe for execution against our content security policy.
// @see https://helmetjs.github.io/docs/csp/
function nonceMiddleware(req: $Request, res: $Response, next: NextFunction) {
  res.locals.nonce = uuid(); // eslint-disable-line no-param-reassign
  next();
}

export default (app) => {
  app.disable('x-powered-by');
  app.set('trust proxy', 'loopback');
  app.use(nonceMiddleware);
  // enable CORS - Cross Origin Resource Sharing
  // allow for sending credentials (auth token) in the headers.
  app.use(cors({ origin: true, credentials: true }));
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true, limit: config.body.limit }));
  // parse application/anything+json
  app.use(bodyParser.json({ type: 'application/vnd.api+json', limit: config.body.limit }));
  // parse application/json
  app.use(bodyParser.json({ type: 'application/json', limit: config.body.limit }));
  // parse text/plain
  app.use(bodyParser.text({ type: 'text/plain', limit: config.body.limit }));
  // parse anything else
  app.use(bodyParser.raw({ limit: config.body.limit }));
  // must be right after bodyParser
  app.use(expressValidator());
  app.use(hpp());
  app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    app.use(morgan('dev'));
  }
};
