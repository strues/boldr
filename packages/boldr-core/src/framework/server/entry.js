/* eslint-disable require-await, max-statements */
/**
 * @module boldr/framework/server/entry
 */
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import Helmet from 'react-helmet';
import _debug from 'debug';
import { createBatchingNetworkInterface } from 'apollo-client';
import { ApolloProvider, getDataFromTree } from 'react-apollo';

import createHistory from 'history/createMemoryHistory';
import StaticRouter from 'react-router-dom/StaticRouter';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { cyan, pink } from 'material-ui/styles/colors';
import { ServerStyleSheet } from 'styled-components';
import getDefault from '../../internal/getDefault';

import createApolloClient from '../shared/createApolloClient';
import createStore from '../shared/createStore';
import CreateHtml from './page/CreateHtml';

function createStyleManager() {
  return MuiThemeProvider.createDefaultContext({
    theme: createMuiTheme({
      palette: createPalette({
        primary: cyan,
        accent: pink,
        type: 'light',
      }),
    }),
  });
}
export default async config => {
  const debug = _debug('boldr:core:framework:server');

  return clientInfo => async (req, res, next) => {
    const { styleManager, theme } = createStyleManager();

    const htmlAttributes = getDefault(require('@@HtmlAttributes'));
    const AppContainer = getDefault(require('@@AppContainer'));

    const networkInterface = createBatchingNetworkInterface({
      uri: process.env.GRAPHQL_URL || 'http://localhost:8080/api/v1/graphql',
      opts: {
        credentials: 'same-origin',
        headers: req.headers,
      },
      batchInterval: 20,
    });

    const client = createApolloClient(networkInterface);
    const history = createHistory();
    const store = createStore(client, history);

    global.navigator = global.navigator || {};
    global.navigator.userAgent = global.navigator.userAgent || req.headers['user-agent'];

    const sheet = new ServerStyleSheet();
    const allAssets = res.locals.webpackStats.toJson().assetsByChunkName;

    const headHtml = {
      ...htmlAttributes,
    };
    const routerContext = {};
    const appComponent = (
      <StaticRouter location={req.url} context={routerContext}>
        <ApolloProvider store={store} client={client}>
          <MuiThemeProvider styleManager={styleManager} theme={theme}>
            <AppContainer
              {...{
                store,
                headHtml,
              }}
            />
          </MuiThemeProvider>
        </ApolloProvider>
      </StaticRouter>
    );
    // get data from apollo
    await getDataFromTree(appComponent);
    const reactAppString = renderToString(sheet.collectStyles(appComponent));

    if (routerContext.url) {
      res.writeHead(301, {
        Location: routerContext.url,
      });
      res.end();
    }
    // Grab the CSS from MaterialUI styleManager.
    const materialCss = styleManager.sheetsToString();
    // Grab the css from styled-components
    const styledCss = sheet.getStyleTags();
    // helmet header attributes
    const head = Helmet.renderStatic();
    // render our app to markup
    const html = renderToStaticMarkup(
      // $FlowIssue
      <CreateHtml
        reactAppString={reactAppString}
        nonce={res.locals.nonce}
        helmet={head}
        assets={allAssets}
        materialCss={materialCss}
        preloadedState={store.getState()}
      />,
    );

    return res.status(200).send(`<!DOCTYPE html>${html}`);
  };
};
