import cors from 'cors';
import uuid from 'uuid';
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import expressValidator from 'express-validator';
import morgan from 'morgan';
import flash from 'express-flash';
import busboy from 'connect-busboy';
import hpp from 'hpp';
import getConfig from '../../config/get';

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
  app.use(compression());
  // enable CORS - Cross Origin Resource Sharing
  // allow for sending credentials (auth token) in the headers.
  app.use(cors({ origin: true, credentials: true }));
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true, limit: getConfig('body.limit') }));
  // parse application/anything+json
  app.use(bodyParser.json({ type: 'application/*+json', limit: getConfig('body.limit') }));
  // parse application/json
  app.use(bodyParser.json({ type: 'application/json', limit: getConfig('body.limit') }));
  // parse text/plain
  app.use(bodyParser.text({ type: 'text/plain', limit: getConfig('body.limit') }));
  // parse anything else
  app.use(bodyParser.raw({ limit: getConfig('body.limit') }));
  // must be right after bodyParser
  app.use(expressValidator());
  app.use(busboy({
    limits: {
      fileSize: 5242880,
    },
  }));
  app.use(hpp());
  app.use(flash());
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
