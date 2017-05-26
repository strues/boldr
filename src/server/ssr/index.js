/* @flow */
import 'isomorphic-fetch';
import React from 'react';
import type { $Response, $Request } from 'express';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import createHistory from 'history/createMemoryHistory';
import StaticRouter from 'react-router-dom/StaticRouter';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { ServerStyleSheet } from 'styled-components';

import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { createBatchingNetworkInterface } from 'apollo-client';

import createApolloClient from '../../shared/core/createApolloClient';
import configureStore from '../../shared/state/store';
import muiTheme from '../../shared/templates/muiTheme';
import App from '../../shared/App';
import CreateHtml from './CreateHtml';

const debug = require('debug')('boldr:ssrMW');

async function ssrMiddleware(req: $Request, res: $Response) {
  if (typeof res.locals.nonce !== 'string') {
    throw new Error('A "nonce" value is missing from the response.');
  }

  global.navigator = { userAgent: req.headers['user-agent'] };
  let networkInterface = createBatchingNetworkInterface({
    uri: 'http://localhost:3000/api/v1/graphql',
    opts: {
      credentials: 'same-origin',
      headers: req.headers,
    },
    batchInterval: 20,
  });
  const preloadedState = {};
  // Create a new server Apollo client for this request
  const client = createApolloClient(networkInterface);
  const history = createHistory();
  const store = configureStore(client, preloadedState, history);
  const sheet = new ServerStyleSheet();
  // Create context for React Router
  const routerContext = {};
  // Generate the HTML from our React tree.  We're wrapping the result
  // in `react-router`'s <StaticRouter> which will pull out URL info and
  // store it in our empty `route` object
  const appComponent = (
    <StaticRouter location={req.url} context={routerContext}>
      <ApolloProvider store={store} client={client}>
        <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
          <App />
        </MuiThemeProvider>
      </ApolloProvider>
    </StaticRouter>
  );
  await getDataFromTree(appComponent);

  const reactAppString = renderToString(sheet.collectStyles(appComponent));

  if (routerContext.url) {
    res.writeHead(301, {
      Location: routerContext.url,
    });
    res.end();
  }
  // Checking is page is 404
  const status = routerContext.status === '404' ? 404 : 200;
  // Render our application to a string for the first time
  const css = sheet.getStyleTags();
  const helmet = Helmet.renderStatic();
  const finalState = store.getState();
  // render styled-components styleSheets to string.
  // Render the application to static HTML markup
  const html = renderToStaticMarkup(
    // $FlowIssue
    <CreateHtml
      reactAppString={reactAppString}
      nonce={res.locals.nonce}
      helmet={helmet}
      styledCss={css}
      preloadedState={finalState}
    />,
  );
  // Check if the render result contains a redirect, if so we need to set
  // the specific status and redirect header and end the response

  // Pass the route and initial state into html template
  return res.status(status).send(`<!DOCTYPE html>${html}`);
}
export default ssrMiddleware;
