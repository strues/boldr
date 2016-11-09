import Express from 'express';
import errorHandler from 'errorhandler';
import lusca from 'lusca';
import expressWinston from 'express-winston';

import morgan from 'morgan';

import { authMiddleware, expressMiddleware, errorCatcher, middleware } from './core/middleware';
import { default as winstonInstance } from './core/logger';
import routes from './modules/routes';

const debug = require('debug')('boldr:ssr-server');
const config = require('./config/config');

const app = Express();
const env = config.get('node_env') || 'development';

app.disable('x-powered-by');
app.set('trust proxy', 'loopback');
// contains body-parser, method-override, shrink-ray, helmet
expressMiddleware(app);
// contains cookie-parser, passport, jwt, session
authMiddleware(app);
// attaches to router
app.use(middleware());

if (env !== 'production') {
  app.use(morgan('dev'));
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true,   // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true,   // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}
if (env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance,
  }));
  app.use(lusca({
    xframe: 'SAMEORIGIN',
    hsts: {
      // 1 year, in seconds
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    xssProtection: true,
  }));
}

app.use(config.get('prefix'), routes);

app.use(errorCatcher);

if (env === 'development' || env === 'test') {
  app.use(errorHandler());
}

export default app;
