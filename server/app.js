import { resolve as pathResolve } from 'path';
import express from 'express';
import appRootDir from 'app-root-dir';
import getConfig from '../config/get';
import { expressMiddleware, authMiddleware, rbac, errorHandler } from './middleware';
import routes from './routes/index';
import redisClient from './services/redis';
import boldrSSR from './middleware/boldrSSR';
import clientBundle from './middleware/clientBundle';

const cache = require('express-redis-cache')({ client: redisClient });

const app = express();

// contains body-parser, method-override, etc...
expressMiddleware(app);
authMiddleware(app);
app.use(rbac());

// attaches to router
app.use('/api/v1', routes);

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
