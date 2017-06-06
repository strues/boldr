/* @flow */
/* eslint-disable babel/new-cap, id-match */
import { resolve as pathResolve } from 'path';
import express from 'express';
import _debug from 'debug';
import formatError from 'boldr-utils/es/gql/errors';
import appRoot from 'boldr-utils/es/node/appRoot';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import routes from './routes/index';
import { expressMiddleware, authMiddleware, errorHandler } from './middleware';
import ssrMiddleware from './ssr';
import config from './config';
import RootSchema from './data/rootSchema';

const debug = _debug('boldr:server:app');

const app: express$Application = express();
// Base Express middleware - body-parser, method-override, cors
expressMiddleware(app);
// Session middleware, authentication check, rbac
authMiddleware(app);
// All routes for the app
routes(app);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/api/v1/graphql',
  }),
);

const graphqlHandler = graphqlExpress(req => {
  const query = req.query.query || req.body.query;
  if (query && query.length > 2000) {
    // None of our app's queries are this long
    // Probably indicates someone trying to send an overly expensive query
    throw new Error('Query too large.');
  }
  return {
    schema: RootSchema,
    context: {
      req,
      user: req.user ? req.user : null,
    },
    debug: true,
  };
});

app.use('/api/v1/graphql', graphqlHandler);
// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
app.use('/uploads', express.static(pathResolve(appRoot.get(), './public/uploads')));
// Setup the public directory so that we can serve static assets.
app.use(express.static(pathResolve(appRoot.get(), './public')));
// app.get('/admin', adminSsr);
// Pass any get request through the SSR middleware before sending it back
app.get('*', ssrMiddleware);
// Catch and format errors
errorHandler(app);

export default app;
