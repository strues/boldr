/* eslint-disable babel/new-cap, id-match */
import path from 'path';
import express from 'express';
import appRoot from '@boldr/utils/lib/node/appRoot';
import config from '@boldr/config';
import {
  initAuth,
  initGraphql,
  initSecurity,
  initCore,
  queryLogger,
  initErrorHandler,
} from './middleware';

import routes from './routes';

const app = express();
// initErrorHandler(app);
// cors, hpp, helmet
initSecurity(app, {
  enableNonce: config.get('server.enableNonce'),
  enableCSP: config.get('server.enableCSP'),
  hstsMA: config.get('security.hsts.maxAge'),
});
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
app.use('/uploads', express.static(path.resolve(appRoot.get(), './public/uploads')));

// Everything in public/ is served as the root directory.
app.use(express.static(path.resolve(appRoot.get(), './public')));

// if we end up here, something isnt right...
initErrorHandler(app);

export default app;
