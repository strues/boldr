/* eslint-disable babel/new-cap, id-match */
import { resolve as pathResolve } from 'path';
import express from 'express';
import appRoot from '@boldr/utils/lib/node/appRoot';

import {
  initAuth,
  initGraphql,
  initSecurity,
  initCore,
  initErrorHandler,
  queryLogger,
  addFallbackHandler,
} from './middleware';

import routes from './routes';

const app = express();

initErrorHandler(app);
// cors, hpp, helmet
initSecurity(app, { enableNonce: true, enableCSP: false });
// Base Express middleware - body-parser, method-override
initCore(app);
// Session middleware, authentication check, rbac
initAuth(app);
// /auth/check, /auth/verify, /token/reset-password, /token/forgot-password
routes(app);
// log graphql queries to debug
app.use(queryLogger());
// graphql middleware
initGraphql(app);
// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
app.use('/uploads', express.static(pathResolve(appRoot.get(), './public/uploads')));

// Setup the public directory so that we can serve static assets.
app.use(express.static(pathResolve(appRoot.get(), './public')));

// For all things which did not went well.
addFallbackHandler(app);

export default app;
