/* eslint-disable babel/new-cap, id-match */

import path from 'path';
import bodyParser from 'body-parser';
import appRoot from '@boldr/utils/lib/node/appRoot';
import { printSchema } from 'graphql';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import getConfig from '@boldr/config';
// import loaders from '../graphql/loaders';
import dataloaders from '../graphql/loaders/index';
import models from '../models';
import ValidationError from '../errors/validationError';
import formatError from '../errors/formatError';
import schema from '../graphql/schema';
import apolloUpload from './apolloUpload';

const graphqlHandler = graphqlExpress(req => {
  const query = req.query.query || req.body.query;
  if (query && query.length > 2000) {
    // None of our app's queries are this long
    // Probably indicates someone trying to send an overly expensive query
    throw new Error('Query too large.');
  }
  return {
    schema,
    context: {
      req,
      ValidationError,
      models,
      user: req.session.user ? req.session.user : null,
      loaders: dataloaders(),
    },
    debug: process.env.NODE_ENV !== 'production',
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

const config = getConfig();

export default function initGraphql(app) {
  app.get(`${config.server.prefix}/graphql/schema`, (req, res) => {
    res.type('text/plain').send(printSchema(RootSchema));
  });

  // Enable GraphiQL in the config file. Only accessible
  // during development mode by default.
  if (config.server.graphiql && process.env.NODE_ENV === 'development') {
    app.use(
      '/graphiql',
      graphiqlExpress({
        endpointURL: `${config.server.prefix}/graphql`,
      }),
    );
  }

  app.use(
    `${config.server.prefix}/graphql`,
    ...gqlMiddleware,
    apolloUpload({
      uploadDir: path.resolve(appRoot.get(), './public/uploads/tmp'),
    }),
    graphqlHandler,
  );
}
