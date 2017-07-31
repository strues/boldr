/* eslint-disable babel/new-cap, id-match */
import { resolve as pathResolve } from 'path';
import bodyParser from 'body-parser';
import appRoot from 'boldr-utils/lib/node/appRoot';
import { printSchema } from 'graphql';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import DataLoaders from '../DataLoaders';
import RootSchema from '../data/rootSchema';
import { config } from '../config';
import apolloUpload from './apolloUpload';

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
    debug: config.get('isDebug'),
    pretty: process.env.NODE_ENV !== 'production',
    formatError: error => ({
      message: error.message,
      state: error.originalError && error.originalError.state,
      locations: error.locations,
      path: error.path,
    }),
  };
});
const gqlMiddleware = [
  bodyParser.json(),
  bodyParser.text({ type: 'application/graphql' }),
  (req, res, next) => {
    if (req.is('application/graphql')) {
      req.body = { query: req.body };
    }
    next();
  },
];
export default app => {
  app.get(`${config.get('server.prefix')}/graphql/schema`, (req, res) => {
    res.type('text/plain').send(printSchema(RootSchema));
  });

  // Enable GraphiQL in the config file. Only accessible
  // during development mode by default.
  if (config.get('server.graphiql') && config.get('isDev')) {
    app.use(
      '/graphiql',
      graphiqlExpress({
        endpointURL: `${config.get('server.prefix')}/graphql`,
      }),
    );
  }

  app.use(
    `${config.get('server.prefix')}/graphql`,
    ...gqlMiddleware,
    apolloUpload({
      uploadDir: pathResolve(appRoot.get(), './public/uploads/tmp'),
    }),
    graphqlHandler,
  );
};
