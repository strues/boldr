import React from 'react';

import ReactDOMServer from 'react-dom/server';
import { renderToStringWithData } from 'react-apollo';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { ServerStyleSheet } from 'styled-components';

import { serverRender, createHistory, createApolloClient, createBoldrStore } from '@boldr/core';
import App from './components/App/App.js';
import appReducer from './reducers';
import Html from './components/Html';

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
  // eslint-disable-next-line no-unused-vars
  async (req, res, next) => {
    const apolloClient = createApolloClient({
      batchRequests: false,
      uri: process.env.GRAPHQL_ENDPOINT,
    });

    // create the memoryHistory and push our current request's path into it.
    const history = createHistory({ initialEntries: [req.path] });
    const initialState = {};
    // Create the Redux store, populate the redux middleware w/ the apollo middleware
    const reduxStore = createBoldrStore(history, appReducer, initialState, apolloClient);

    const routerContext = {};

    const sheet = new ServerStyleSheet();

    const location = req.url;
    // appComponent takes the apolloClient, the reduxStore, location (req.url), the routerContext and
    // the <App /> component.
    // It populates the ApolloProvider, StaticRouter and places the application component
    const appComponent = serverRender(
      { apolloClient, reduxStore, location, routerContext },
      <App />,
    );
    let markup = '';
    try {
      // render the applicaation to a string, collecting what's necessary to populate apollo's data and let styled-components
      // create stylesheet elements
      markup = await renderToStringWithData(sheet.collectStyles(appComponent));
    } catch (err) {
      console.error('Unable to render server side React:', err);
    }

    const chunkNames = flushChunkNames();
    console.log('[BOLDR] Flushing chunks...', chunkNames);

    const { scripts, stylesheets, cssHashRaw } = flushChunks(clientStats, {
      chunkNames: chunkNames,
      before: ['bootstrap', 'vendor'],
      after: ['main'],
      outputPath,
    });

    const finalState = {
      ...reduxStore.getState(),
      apollo: apolloClient.getInitialState(),
    };
    const html = ReactDOMServer.renderToNodeStream(
      <Html
        styles={stylesheets}
        cssHash={cssHashRaw}
        js={scripts}
        styleTags={sheet.getStyleElement()}
        component={markup}
        state={finalState}
      />,
    );

    switch (routerContext.status) {
      case 301:
      case 302:
        res.status(routerContext.status);
        res.location(routerContext.url);
        res.end();
        break;
      case 404:
        res.status(routerContext.status);
        res.type('html');
        res.write('<!doctype html>');
        html.pipe(res);
        break;
      default:
        res.status(200);
        res.type('html');
        res.setHeader('Cache-Control', 'no-cache');
        res.write('<!doctype html>');
        html.pipe(res);
    }
  };
