import { resolve as pathResolve } from 'path';
import Express from 'express';
import appRootDir from 'app-root-dir';
import routes from './routes/index';
import redisClient from './services/redis';
import { expressMiddleware, authMiddleware, errorHandler } from './middleware';

const debug = require('debug')('boldrAPI:app');

const app = new Express();

// Base Express middleware
// body-parser, method-override, busboy, cors
expressMiddleware(app);
// Session middleware, authentication check, rbac
authMiddleware(app);
// All routes for the app
routes(app);

// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
app.use('/uploads', Express.static(pathResolve(appRootDir.get(), './static/uploads')));
// Catch and format errors
errorHandler(app);

module.exports = app;
