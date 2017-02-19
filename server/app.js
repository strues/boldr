import { resolve as pathResolve } from 'path';
import http from 'http';

import express from 'express';
import appRootDir from 'app-root-dir';

import config from '../config';
import {
  boldrSSR,
  clientBundle,
  expressMiddleware,
  authMiddleware,
  rbac,
  errorHandler,
  offlinePage,
  serviceWorker,
} from './middleware';
import routes from './routes/index';
import redisClient from './services/redis';

const cache = require('express-redis-cache')({ client: redisClient });
const debug = require('debug')('boldr:server-app');

const app = express();
const server = http.createServer(app);
// contains body-parser, method-override, etc...
expressMiddleware(app);
authMiddleware(app);
app.use(rbac());

// attaches to router
routes(app);

if (!process.env.BUILD_FLAG_IS_DEV && config('serviceWorker.enabled')) {
  app.get(`/${config('serviceWorker.fileName')}`, serviceWorker);
  app.get(
    `${config('bundles.client.webPath')}${config('serviceWorker.offlinePageFileName')}`,
    offlinePage,
  );
}

app.use(config('bundles.client.webPath'), clientBundle);
// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
app.use(express.static(pathResolve(appRootDir.get(), config('publicAssetsPath'))));

app.use('/apidocs', express.static(pathResolve(appRootDir.get(), './public/apidocs')));

if (process.env.NODE_ENV === 'production') {
  // The React application middleware.
  app.get('*', cache.route(), boldrSSR);
} else {
  app.get('*', boldrSSR);
}

errorHandler(app);

export default app;
export { server };
