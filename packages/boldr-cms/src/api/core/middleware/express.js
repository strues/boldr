import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import expressValidator from 'express-validator';
import expressWinston from 'express-winston';
import hpp from 'hpp';
import config from '../../../../config/api';
import winstonInstance from '../logger';

export default (app) => {
  app.disable('x-powered-by');
  app.set('trust proxy', 'loopback');
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
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    app.use(expressWinston.logger({
      winstonInstance,
      meta: true, // optional: log meta data about request (defaults to true)
      msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
      colorStatus: true,
    }));
  }
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    app.use(expressWinston.errorLogger({
      winstonInstance,
    }));
  }
};
