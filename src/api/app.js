/* @flow */
import express from 'express';
import type { $Request, $Response, NextFunction } from 'express';
import { NotFound } from './core/errors';
import { authMiddleware, expressMiddleware, rbac } from './core/middleware';
import routes from './routes/index';
import config from './config/index';

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
// $FlowIssue
app.use((err: Error, req: $Request, res: $Response, next: NextFunction) => {// eslint-disable-line no-unused-vars
  /* istanbul ignore next */
  const status = err.status || 500;
  const type = err.type || 'UnknownError';
  const message = err.message || 'Something went wrong.';
  // $FlowIssue
  res.status(status);
  /* istanbul ignore next */
  res.send({ type, message, stack: process.env.NODE_ENV === 'development' ? err.stack : {} });
});

export default app;
