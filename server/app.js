/* @flow */
/* eslint-disable babel/new-cap, id-match */
import 'isomorphic-fetch/fetch-npm-node';
import { resolve as pathResolve } from 'path';
import express from 'express';
import _debug from 'debug';
import bodyParser from 'body-parser';
import appRoot from 'boldr-utils/lib/node/appRoot';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { printSchema } from 'graphql';
import DataLoaders from './DataLoaders';
import { expressMiddleware, authMiddleware, errorHandler, apolloUpload } from './middleware';
import { mainRedisClient } from './services/redis';
import RootSchema from './data/rootSchema';
import config from './config';
import routes from './routes';
import { enableEnhancedStackTraces } from './utils/debugUtil';

const debug = _debug('boldr:server:app');

enableEnhancedStackTraces();

const app: express$Application = express();

// Base Express middleware - body-parser, method-override, cors
expressMiddleware(app);
// Session middleware, authentication check, rbac
authMiddleware(app);

app.get('/graphql/schema', (req, res) => {
  res.type('text/plain').send(printSchema(RootSchema));
});

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: `${config.api.prefix}/graphql`,
  }),
);

routes(app);

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
      ...DataLoaders.create(),
    },
    debug: true,
    pretty: process.env.NODE_ENV !== 'production',
    formatError: error => ({
      message: error.message,
      state: error.originalError && error.originalError.state,
      locations: error.locations,
      path: error.path,
    }),
  };
});

app.use(
  `${config.api.prefix}/graphql`,
  bodyParser.json(),
  apolloUpload({
    uploadDir: pathResolve(appRoot.get(), './public/uploads/tmp'),
  }),
  graphqlHandler,
);
// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
app.use('/uploads', express.static(pathResolve(appRoot.get(), './public/uploads')));

app.use('/assets', express.static(pathResolve(appRoot.get(), './build/assets')));
// Setup the public directory so that we can serve static assets.
app.use(express.static(pathResolve(appRoot.get(), './public')));
// Pass any get request through the SSR middleware before sending it back
// app.get('*', ssrMiddleware);
if (process.env.NODE_ENV === 'development') {
  app.use(require('./middleware/hot'));
} else {
  const clientStats = require('../build/assets/client-stats.json');
  const serverRenderer = require('../build/serverRenderer.js').default;

  // server.use(publicPath, express.static(outputPath))
  app.use(serverRenderer({ clientStats }));
}

// Catch and format errors
errorHandler(app);

export default app;
