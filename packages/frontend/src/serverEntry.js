import React from 'react';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderToStringWithData } from 'react-apollo';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import serialize from 'serialize-javascript';
import { ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';

import { wrapBoldrApp, createApolloClient, createBoldrStore } from '@boldr/core';
import App from './components/App/App.js';

import appReducer from './reducers';

/**
 * Express middleware to render HTML
 * @param  {object}     clientStats Webpack stats output
 * @param {String}      outputPath  the compiled bundle's path
 * @return {function}   middleware function  the server rendering middleware it allows you to require the
 *                                           production version of this as an express middleware.
 */
export default ({ clientStats, outputPath }) =>
  /*
     * @param
     * @param
     * @return  undefined
     */
  /**
   * Sends the page to be rendered to the browser
   * @param  {[Object]}   req Express request object
   * @param  {Object}     res Express response object
   * @return {htmlAttributes}     the page :)
   */
  async (req, res) => {
    const initialState = {};
    const apolloClient = createApolloClient({
      initialState,
      apolloUri: process.env.GRAPHQL_ENDPOINT,
    });
    const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';
    const reduxStore = createBoldrStore(appReducer, initialState, apolloClient, env);
    const routerContext = {};
    const sheet = new ServerStyleSheet();
    const appComponent = (
      <StaticRouter location={req.url} context={routerContext}>
        <App />
      </StaticRouter>
    );

    const markup = wrapBoldrApp(appComponent, apolloClient, reduxStore);
    const app = await renderToStringWithData(sheet.collectStyles(markup));
    if (routerContext.url) {
      res.status(301).setHeader('Location', routerContext.url);
      res.redirect(routerContext.url);
      return;
    }
    const chunkNames = flushChunkNames();
    const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames, outputPath });
    const preloadedState = reduxStore.getState();
    preloadedState.apollo = apolloClient.getInitialState();
    const styleTags = sheet.getStyleTags();
    const helmet = Helmet.renderStatic();
    res.send(`
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
              <div id="app"><div>${app}</div></div>
              <script type="text/javascript" src="/static/boldrDLLs.js"></script>
              ${js}
                ${cssHash}
              <script type="text/javascript">
                window.__APOLLO_STATE__=${serialize(preloadedState, {
                  json: true,
                })}
              </script>

            </body>
          </html>`);
  };
