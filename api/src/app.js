/* @flow */
/* eslint-disable id-match */
import path from 'path';
import express from 'express';
import appRoot from 'boldr-utils/lib/node/appRoot';
import _debug from 'debug';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import PrettyError from 'pretty-error';
import { printSchema } from 'graphql';
import DataLoader from './DataLoader';
import { expressMiddleware, authMiddleware, errorHandler } from './middleware';
import { mainRedisClient } from './services/redis';
import RootSchema from './data/rootSchema';
import config from './config';
import routes from './routes';

const debug = _debug('boldr:api:app');
const app = express();
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
    endpointURL: '/api/v1/graphql',
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
      ...DataLoader.create(),
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
app.use('/api/v1/graphql', graphqlHandler);
app.use(express.static(path.resolve(appRoot.get(), 'uploads')));
errorHandler(app);

export default app;
