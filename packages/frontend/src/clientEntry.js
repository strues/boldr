/* eslint-disable prefer-destructuring, no-underscore-dangle, new-cap */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import {
  getToken,
  createApolloClient,
  createBoldrStore,
  wrapBoldrApp,
  createHistory,
} from '@boldr/core';
import { ConnectedRouter } from 'react-router-redux';
import { checkAuth } from './scenes/Account/state/actions';
import App from './components/App';
import appReducer from './reducers';
import theme from './theme/theme';
import { injectResetStyle } from './theme/resetStyle';
import ThemeProvider from './theme/ThemeProvider';

injectResetStyle();

const DOM_NODE = document.getElementById('app');
let preloadedState = {};

if (window.__APOLLO_STATE__) {
  preloadedState = window.__APOLLO_STATE__;
}
const token = getToken();

export const apolloClient = createApolloClient({
  batchRequests: false,
  initialState: preloadedState,
  apolloUri: process.env.GRAPHQL_ENDPOINT,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
const history = createHistory();
// Create the redux store by passing the "main" reducer, preloadedState, the Apollo Client
// and env. Passing either 'development' or 'production' (env) includes/excludes
// reduxDevTools, etc
const reduxStore = createBoldrStore(history, appReducer, preloadedState, apolloClient);

if (token) {
  // Update application state. User has token and is probably authenticated
  reduxStore.dispatch(checkAuth(token));
}
const AppComponent = PassedApp => (
  <ConnectedRouter history={history}>
    <ThemeProvider theme={theme}>{PassedApp}</ThemeProvider>
  </ConnectedRouter>
);

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const { AppContainer } = require('react-hot-loader');

  let Application = App;

  if (module && module.hot) {
    module.hot.dispose(() => {
      // Force Apollo to fetch the latest data from the server
      delete window.__APOLLO_STATE__;
    });
    module.hot.accept('./components/App', () => {
      Application = require('./components/App').default;
      setImmediate(() => {
        // Preventing the hot reloading error from react-router
        unmountComponentAtNode(DOM_NODE);
        render(
          wrapBoldrApp(
            AppComponent(
              <AppContainer>
                <Application />
              </AppContainer>,
            ),
            apolloClient,
            reduxStore,
          ),
          DOM_NODE,
        );
      });
    });
  }
}

render(wrapBoldrApp(AppComponent(<App />), apolloClient, reduxStore), DOM_NODE);
