import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import createMemoryHistory from 'history/createMemoryHistory';
import StaticRouter from 'react-router-dom/StaticRouter';
import { ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';
import appRoot from 'boldr-utils/lib/node/appRoot';
import { flushModuleIds } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { createBatchingNetworkInterface } from 'apollo-client';

import apolloClient from '../createApolloClient';
import App from '../App';
import configureStore from '../store';

const isDev = process.env.NODE_ENV === 'development';

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
  return async (req, res, next) => {
    const { nonce } = res.locals;
    global.navigator = { userAgent: req.headers['user-agent'] };

    const history = createMemoryHistory({ initialEntries: ['/'] });
    const initialState = {};
    const store = configureStore(apolloClient, initialState, history);
    //
    const sheet = new ServerStyleSheet();
    const routerContext = {};

    const appComponent = (
      <ApolloProvider store={store} client={apolloClient}>
        <StaticRouter location={req.url} context={routerContext}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    );

    await getDataFromTree(appComponent);

    const markup = renderToString(sheet.collectStyles(appComponent));
    const moduleIds = flushModuleIds();
    const helmet = Helmet.renderStatic();

    const { js, styles, publicPath, cssHash } = await flushChunks(clientStats, {
      moduleIds,
      before: ['bootstrap', 'vendor'],
      after: ['main'],
      outputPath,
      rootDir: path.resolve(appRoot.get()),
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
              <script nonce=${nonce} type="text/javascript" src="/assets/boldrDLLs.js"></script>
              ${js}
              <script type="text/javascript" nonce=${nonce}>
                window.__APOLLO_STATE__=${serialize(preloadedState, {
                  json: true,
                })}
              </script>
              ${cssHash}
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
               ${cssHash}
            </body>
          </html>`);
    }
  };
};
