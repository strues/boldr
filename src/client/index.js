/* @flow */
/* eslint-disable global-require */
import './polyfill';

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import WebFontLoader from 'webfontloader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { ApolloProvider } from 'react-apollo';
import { createBatchingNetworkInterface } from 'apollo-client';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import createApolloClient from '../shared/core/createApolloClient';
import muiTheme from '../shared/templates/muiTheme';
import configureStore from '../shared/state/store';
import renderRoutes from '../shared/core/addRoutes';
import routes from '../shared/routes';
import { checkAuth } from '../shared/scenes/Account/state/actions';
import { getToken } from '../shared/core/authentication/token';
import ReactHotLoader from './ReactHotLoader';

// click helper required for Material-UI
injectTapEventPlugin();

// Async font loading
WebFontLoader.load({
  google: {
    families: ['Roboto:200,400,600', 'Material Icons'],
  },
  custom: {
    families: ['FontAwesome'],
    urls: [
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
    ],
  },
});

const MOUNT_POINT = document.getElementById('app');
const token = getToken();
// Does the user's browser support the HTML5 history API?
// If the user's browser doesn't support the HTML5 history API then we
// will force full page refreshes on each page change.
const supportsHistory = 'pushState' in window.history;
// Apollo browser client
const networkInterface = createBatchingNetworkInterface({
  opts: {
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
  batchInterval: 20,
  uri: '/api/v1/graphql',
});
const client = createApolloClient(networkInterface);
const history = createHistory();
const preloadedState = window.__APOLLO_STATE__;
const store = configureStore(client, preloadedState, history);
const { dispatch } = store;

if (!!token) {
  // Update application state. User has token and is probably authenticated
  dispatch(checkAuth(token));
}
function renderApp(Component) {
  render(
    <ReactHotLoader>
      <ApolloProvider store={store} client={client}>
        <ConnectedRouter history={history} forceRefresh={!supportsHistory}>
          <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
            {renderRoutes(routes)}
          </MuiThemeProvider>
        </ConnectedRouter>
      </ApolloProvider>
    </ReactHotLoader>,
    MOUNT_POINT,
  );
}

if (module.hot) {
  const reRenderApp = () => {
    try {
      renderApp(require('../shared/components/App/App').default);
    } catch (error) {
      const RedBox = require('redbox-react').default;

      render(<RedBox error={error} />, MOUNT_POINT);
    }
  };
  module.hot.accept('../shared/components/App/App', () => {
    setImmediate(() => {
      // Preventing the hot reloading error from react-router
      unmountComponentAtNode(MOUNT_POINT);
      reRenderApp();
    });
  });
}
renderApp();
