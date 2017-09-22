import React from 'react';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderToStringWithData } from 'react-apollo';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import serialize from 'serialize-javascript';
import { ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';

import { wrapBoldrApp, createHistory, createApolloClient, createBoldrStore } from '@boldr/core';
import App from './components/App/App.js';
import appReducer from './reducers';

/**
 * Express middleware to render HTML
 * @param  {object}     clientStats Webpack stats output
 * @param {String}      outputPath  the compiled bundle's path
 * @return {function}   middleware function  the server rendering middleware it allows you to require the production version of this as an express middleware.
 */
export default ({ clientStats, outputPath }) =>
  /**
   * Sends the page to be rendered to the browser
   * @param  {[Object]}   req Express request object
   * @param  {Object}     res Express response object
   * @return {htmlAttributes}     the page :)
   */
  async (req, res) => {
    const apolloClient = createApolloClient({
      batchRequests: true,
      uri: process.env.GRAPHQL_ENDPOINT,
    });

    // create the memoryHistory and push our current request's path into it.
    const history = createHistory({ initialEntries: [req.path] });
    const initialState = {};
    // Create the Redux store, populate the redux middleware w/ the apollo middleware
    const reduxStore = createBoldrStore(history, appReducer, initialState, apolloClient);

    const routerContext = {};

    const sheet = new ServerStyleSheet();
    const appComponent = (
      <StaticRouter location={req.url} context={routerContext}>
        <App />
      </StaticRouter>
    );
    // Wrap the router and application component in the ApolloProvider
    const markup = wrapBoldrApp(appComponent, apolloClient, reduxStore);
    // Traverse the component tree looking for queries and styled-component data
    // then transform it all into a string
    const app = await renderToStringWithData(sheet.collectStyles(markup));

    if (routerContext.url) {
      res.status(301).setHeader('Location', routerContext.url);
      res.redirect(routerContext.url);
      return;
    }
    console.log('[BOLDR] Flushing chunks...');
    const chunkNames = flushChunkNames();

    console.log('[BOLDR] Rendered Chunk Names:', chunkNames.join(', '));
    const { js, styles, cssHash } = flushChunks(clientStats, {
      chunkNames,
      outputPath: outputPath,
    });

    console.log(`[BOLDR] Flushed Script Tags:\n${js.toString()}\n`);
    console.log(`[BOLDR] Flushed CSS Tags:\n${styles.toString()}\n`);

    const preloadedState = {
      ...reduxStore.getState(),
      apollo: apolloClient.getInitialState(),
    };

    const styleTags = sheet.getStyleTags();
    const helmet = Helmet.renderStatic();
    const dlls = '<script type="text/javascript" src="/static/boldrDLLs.js"></script>';
    res.send(`
        <!doctype html>
          <html ${helmet.htmlAttributes.toString()}>
            <head>
              ${helmet.title.toString()}
              ${helmet.meta.toString()}
              ${helmet.link.toString()}

              ${styles}
              ${helmet.style.toString()}
              ${styleTags}
            </head>
            <body ${helmet.bodyAttributes.toString()}>
              <div id="app"><div>${app}</div></div>
              <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" type="text/javascript"></script>
              ${process.env.NODE_ENV === 'development' ? dlls : <span />}
              ${js}
              ${cssHash}
              <script type="text/javascript">
              WebFont.load({ google: { families: ['Roboto:300,400,700','Chivo:300,700'] } });
            </script>

              <script type="text/javascript">
                window.__APOLLO_STATE__=${serialize(preloadedState, {
                  json: true,
                })}
              </script>

            </body>
          </html>`);
  };
