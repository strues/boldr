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

const DOM_NODE = document.getElementById('app');
const preloadedState = window.__APOLLO_STATE__;

const token = getToken();

/**
 * createApolloClient configures an instance of ApolloClient for use in the app.
 * It accepts a config object.
 * The values are documented below...
 *
 * type config = {
 *    headers: Object,
 *    initialState: Object,
 *    batchRequests: boolean, // false
 *    trustNetwork: boolean, // true
 *    queryDeduplication: boolean, // true
 *    uri: string
 *    connectToDevTools: boolean // true
 *    ssrForceFetchDelay: number // 100
 * }
 */
const apolloClient = createApolloClient({
  batchRequests: true,
  initialState: preloadedState,
  uri: process.env.GRAPHQL_ENDPOINT,
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
const AppComponent = PassedApp => <ConnectedRouter history={history}>{PassedApp}</ConnectedRouter>;

render(wrapBoldrApp(AppComponent(<App />), apolloClient, reduxStore), DOM_NODE);

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
