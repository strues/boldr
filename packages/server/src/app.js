/* eslint-disable babel/new-cap, id-match */
import { resolve as pathResolve } from 'path';
import express from 'express';
import appRoot from 'boldr-utils/lib/node/appRoot';
import { expressMiddleware, authMiddleware, gql } from './middleware';
// import { config } from './config';
import routes from './routes';

const app = express();

// Base Express middleware - body-parser, method-override, cors
expressMiddleware(app);
// Session middleware, authentication check, rbac
authMiddleware(app);

// @TODO: left as standard REST routes
// /auth/check, /auth/verify, /token/reset-password, /token/forgot-password
routes(app);
// graphql middleware
gql(app);
// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
app.use('/uploads', express.static(pathResolve(appRoot.get(), './public/uploads')));

// Setup the public directory so that we can serve static assets.
app.use(express.static(pathResolve(appRoot.get(), './public')));

export default app;
