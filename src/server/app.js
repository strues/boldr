/* @flow */
/* eslint-disable babel/new-cap, id-match */
import { resolve as pathResolve } from 'path';
import express from 'express';
import _debug from 'debug';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import routes from './routes/index';
import { expressMiddleware, authMiddleware, errorHandler } from './middleware';
import ssrMiddleware from './ssr';
import graphqlSchema from './graphql/schema';
import graphqlResolvers from './graphql/resolvers';
import config from './config';

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

app.use(
  '/api/v1/graphql',
  graphqlExpress(req => ({
    schema: graphqlSchema,
    context: {
      user: req.user ? req.user : null,
    },
    debug: true,
  })),
);
// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
app.use(
  '/uploads',
  express.static(pathResolve(config.bundle.publicDir, './uploads')),
);

// Setup the public directory so that we can serve static assets.
app.use(express.static(config.bundle.publicDir));
// Pass any get request through the SSR middleware before sending it back
app.get('*', ssrMiddleware);
// Catch and format errors
errorHandler(app);

export default app; // eslint-disable-line
