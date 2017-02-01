/* @flow */
import { resolve as pathResolve } from 'path';
import express from 'express';
import type { $Request, $Response, NextFunction } from 'express';
import appRootDir from 'app-root-dir';
import getConfig from '../config/get';
import logger from './services/logger';

import { NotFound, BadRequest } from './core/errors';
import expressMiddleware from './middleware/express';
import authMiddleware from './middleware/auth';
import errorHandler from './middleware/errorHandler';
import rbac from './middleware/rbac';
import routes from './routes/index';
import boldrSSR from './middleware/boldrSSR';
import clientBundle from './middleware/clientBundle';

const app = express();

// contains body-parser, method-override, etc...
expressMiddleware(app);

// contains cookie-parser, passport, jwt, session
authMiddleware(app);
app.use(rbac());
// attaches to router
app.use('/api/v1', routes);


app.use(getConfig('bundles.client.webPath'), clientBundle);

// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
app.use(express.static(pathResolve(appRootDir.get(), getConfig('publicAssetsPath'))));

// The React application middleware.
app.get('*', boldrSSR);

// catch 404 and forward response to errorhandler
/* istanbul ignore next */
app.use((req: $Request, res: $Response, next: NextFunction) => {
  const err: Error = new NotFound();
  return next(err);
});

process.on('unhandledRejection', (reason, p) => {
  logger.error('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

app.use(errorHandler);

export default app;
