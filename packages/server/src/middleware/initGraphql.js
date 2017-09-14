/* eslint-disable babel/new-cap, id-match */

import path from 'path';
import bodyParser from 'body-parser';
import appRoot from '@boldr/utils/lib/node/appRoot';
import { printSchema } from 'graphql';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { config } from '@boldr/config';
import { createGraphOptions } from '../graphql/index';
import apolloUpload from './apolloUpload';

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

export default function initGraphql(app) {
  app.get(`${config.get('server.prefix')}/graphql/schema`, (req, res) => {
    res.type('text/plain').send(printSchema(RootSchema));
  });

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

  app.use(
    `${config.get('server.prefix')}/graphql`,
    ...gqlMiddleware,
    apolloUpload({
      uploadDir: path.resolve(appRoot.get(), './public/uploads/tmp'),
    }),
    graphqlHandler,
  );
}
