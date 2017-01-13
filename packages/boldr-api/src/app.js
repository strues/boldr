/* @flow */
import express from 'express';
import type { $Request, $Response, NextFunction } from 'express';
import config from './config';
import logger from './core/logger';
import { NotFound } from './core/errors';
import { authMiddleware, expressMiddleware, rbac } from './core/middleware';
import routes from './routes/index';


const app = express();

// contains body-parser, method-override, etc...
expressMiddleware(app);
// contains cookie-parser, passport, jwt, session
authMiddleware(app);
app.use(rbac());
// attaches to router
app.use(config.prefix, routes);

// catch 404 and forward response to errorhandler
/* istanbul ignore next */
app.use((req: $Request, res: $Response, next: NextFunction) => {
  const err: Error = new NotFound();
  return next(err);
});

// catch everything else in this errorhandler and send a stacktrace in development.
app.use((err: Error, req: $Request, res: $Response, next: NextFunction) => {// eslint-disable-line no-unused-vars
  const statusCode = err.status || 500;
  const stacktrace = app.get('env') === 'development' ? {
    stack: err.stack,
  } : {};

  res.status(statusCode);
  res.json({
    status: statusCode,
    error: err.error || err.message,
    ...stacktrace,
  });
});

process.on('unhandledRejection', (reason, p) => {
  logger.error('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

export default app;
