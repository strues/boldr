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
  initSession,
  queryLogger,
  initErrorHandler,
} from './middleware';

import routes from './routes';

const app = express();
// cors, hpp, helmet
initSecurity(app);
// Base Express middleware - body-parser, method-override
initCore(app);
// Express session
initSession(app);
// Session middleware, authentication check, rbac
initAuth(app);
// /auth/check, /auth/verify, /token/reset-password, /token/forgot-password
routes(app);
// graphql middleware
initGraphql(app);

if (config.get('graphql.queryLogger')) {
  // log graphql queries to debug
  app.use(queryLogger());
}
// This serves the SSR middleware (the bundled server entry point), which
// in turn serves the application.
if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line
const clientStats = require('../static/stats.json');
  // eslint-disable-next-line
const serverRender = require('../ssr.js').default;
  // eslint-disable-next-line
app.use('/static', express.static(path.resolve(appRoot.get(), './build/static'), {
      maxage: 31536000000,
    }),
  );

  app.use(serverRender({ clientStats }));
}

// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
app.use('/uploads', express.static(path.resolve(appRoot.get(), './public/uploads')));

// Everything in public/ is served as the root directory.
app.use(express.static(path.resolve(appRoot.get(), './public')));

// if we end up here, something isnt right...
initErrorHandler(app);

export default app;
