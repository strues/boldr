/* @flow */
import React from 'react';
import type { $Response, $Request, NextFunction } from 'express';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import { compose } from 'redux';
import createMemoryHistory from 'history/createMemoryHistory';
import StaticRouter from 'react-router-dom/StaticRouter';
import { ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';
import { flushModuleIds } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { createBatchingNetworkInterface } from 'apollo-client';

import createApolloClient from '../createApolloClient';
import App from '../App';
import configureStore from '../store';

const isDev = process.env.NODE_ENV === 'development';

const debug = require('debug')('boldr:ssrMW');

/**
 * Express middleware to render HTML
 * @param  {object}     clientStats Webpack stats output
 * @param {String}      outputPath  the compiled bundle's path
 * @return {function}   middleware function  the server rendering middleware it allows you to require the
 *                                           production version of this as an express middleware.
 */
export default ({ clientStats, outputPath }) => {
  /**
     * @param  {object}     req Express request object
     * @param  {object}     res Express response object
     * @return {undefined}  undefined
     */
  return async (req: $Request, res: $Response, next: NextFunction) => {
    const { nonce } = res.locals;
    global.navigator = { userAgent: req.headers['user-agent'] };

    const networkInterface = createBatchingNetworkInterface({
      uri: process.env.BOLDR_GRAPHQL_URL,
      opts: {
        credentials: 'same-origin',
        headers: req.headers,
      },
      batchInterval: 20,
    });
    const apolloClient = createApolloClient(networkInterface);
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const initialState = {};
    const store = configureStore(apolloClient, initialState, history);
    //
    const sheet = new ServerStyleSheet();
    const routerContext = {};

    const appComponent = (
      <StaticRouter location={req.url} context={routerContext}>
      <ApolloProvider store={store} client={apolloClient}>
          <App />
      </ApolloProvider>
      </StaticRouter>
    );

    await getDataFromTree(appComponent);

    const markup = renderToString(sheet.collectStyles(appComponent));

    const helmet = Helmet.renderStatic();
    const moduleIds = flushModuleIds();
    const { js, styles, publicPath } = flushChunks(clientStats, {
      moduleIds,
      before: ['bootstrap'],
      after: ['main'],
      outputPath,
    });

    const preloadedState = store.getState();
    preloadedState.apollo = apolloClient.getInitialState();
    const styleTags = sheet.getStyleTags();

    if (routerContext.url) {
      res.status(301).setHeader('Location', routerContext.url);
      res.redirect(routerContext.url);
      return;
    }

    const status = routerContext.status === '404' ? 404 : 200;
    // Two different HTML templates here so that we can server DLLs during development
    // @TODO: figure out how to conditionally add dlls without duplicating the code
    if (isDev) {
      return res.status(status).send(`
        <!doctype html>
          <html ${helmet.htmlAttributes.toString()}>
            <head>
              ${helmet.title.toString()}
              ${helmet.meta.toString()}
              ${helmet.link.toString()}
              ${styleTags}
              ${styles}
              ${helmet.style.toString()}
            </head>
            <body ${helmet.bodyAttributes.toString()}>
              <div id="app"><div>${markup}</div></div>
              <script nonce=${nonce} type="text/javascript" src="/boldrDLLs.js"></script>
              ${js}
              <script type="text/javascript" nonce=${nonce}>
                window.__APOLLO_STATE__=${serialize(preloadedState, {
                  json: true,
                })}
              </script>
            </body>
          </html>`);
    } else {
      return res.status(status).send(`
        <!doctype html>
          <html>
            <head>
              ${helmet.title.toString()}
              ${helmet.meta.toString()}
              ${helmet.link.toString()}
              ${styleTags}
              ${styles}
            </head>
            <body>
              <div id="app">${markup}</div>
              ${js}
              <script type="text/javascript" nonce=${nonce}>
                window.__APOLLO_STATE__=${serialize(preloadedState, {
                  json: true,
                })}
              </script>
            </body>
          </html>`);
    }
  };
};
