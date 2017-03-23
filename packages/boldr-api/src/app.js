import Express from 'express';
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
// Catch and format errors
errorHandler(app);

module.exports = app;
