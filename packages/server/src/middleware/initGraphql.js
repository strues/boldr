/* eslint-disable babel/new-cap, id-match */
import { resolve as pathResolve } from 'path';
import bodyParser from 'body-parser';
import appRoot from '@boldr/utils/lib/node/appRoot';
import OpticsAgent from 'optics-agent';

import { printSchema } from 'graphql';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import loaders from '../data/loaders';
import ValidationError from '../errors/validationError';
import formatError from '../errors/formatError';
import RootSchema from '../schema/rootSchema';
import { config } from '../config';
import apolloUpload from './apolloUpload';

const graphqlHandler = graphqlExpress(req => {
  let opticsContext;
  if (config.get('server.optics')) {
    opticsContext = OpticsAgent.context(req);
  }
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
      ValidationError,
      user: req.user ? req.user : null,
      opticsContext,
      ...loaders.create(),
    },
    debug: config.get('isDebug'),
    pretty: process.env.NODE_ENV !== 'production',
    formatError,
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

export default function initGraphql(app) {
  if (config.get('server.optics')) {
    OpticsAgent.instrumentSchema(RootSchema);
  }

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
  if (config.get('server.optics')) {
    app.use(`${config.get('server.prefix')}/graphql`, OpticsAgent.middleware());
  }
  app.use(
    `${config.get('server.prefix')}/graphql`,
    ...gqlMiddleware,
    apolloUpload({
      uploadDir: pathResolve(appRoot.get(), './public/uploads/tmp'),
    }),
    graphqlHandler,
  );
}
