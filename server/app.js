import { resolve as pathResolve } from 'path';
import http from 'http';
import express from 'express';
import appRootDir from 'app-root-dir';

import getConfig from '../config/get';
import { boldrSSR, clientBundle, expressMiddleware, authMiddleware, rbac, errorHandler } from './middleware';
import routes from './routes/index';
import redisClient from './services/redis';
import Socket from './services/socket/socket';

const cache = require('express-redis-cache')({ client: redisClient });
const debug = require('debug')('boldr:server-app');

const app = express();
const server = http.createServer(app);
// contains body-parser, method-override, etc...
expressMiddleware(app);
authMiddleware(app);
app.use(rbac());

const io = Socket(server);
// attaches to router
routes(app);

app.use(getConfig('bundles.client.webPath'), clientBundle);
// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
app.use(express.static(pathResolve(appRootDir.get(), getConfig('publicAssetsPath'))));

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
