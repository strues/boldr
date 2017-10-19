/* eslint-disable babel/new-cap, id-match */

import path from 'path';
import bodyParser from 'body-parser';
import appRoot from '@boldr/utils/lib/node/appRoot';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import config from '@boldr/config';
// internal
import { createGraphOptions } from '../graphql/index';
import apolloUpload from '../services/apolloUpload';

/**
 * Sets up the Apollo GraphQL server
 *
 * @exports initGraphql
 * @param {any} app the Express app/server object
 */
export default function initGraphql(app) {
  const graphqlHandler = graphqlExpress(createGraphOptions);

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

  // Enable GraphiQL in the config file. Only accessible
  // during development mode by default.
  if (process.env.NODE_ENV === 'development') {
    app.use(
      '/graphiql',
      graphiqlExpress({
        endpointURL: `${config.get('server.prefix')}/graphql`,
      }),
    );
  }

  // 1. /api/v1/graphql
  // 2. body parsing middleware
  // 3. formidable to parse multi-part form encode (upload func)
  // 4. GraphQL handler created w/ schema
  app.use(
    `${config.get('server.prefix')}/graphql`,
    ...gqlMiddleware,
    apolloUpload({
      uploadDir: path.resolve(appRoot.get(), config.get('server.uploadDir')),
    }),
    graphqlHandler,
  );
}
