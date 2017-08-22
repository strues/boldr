/* eslint-disable prefer-destructuring, no-underscore-dangle, new-cap */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';

import { getToken } from '@boldr/auth';
import { createApolloClient, createBoldrStore, RouterConnection, wrapBoldrApp } from '@boldr/core';
import { checkAuth } from './scenes/Account/state/actions';
import App from './components/App';
import appReducer from './reducers';
import { injectResetStyle } from './theme/resetStyle';
import ThemeProvider from './theme/ThemeProvider';

// injectResetStyle();
const DOM_NODE = document.getElementById('app');
const preloadedState = window.__APOLLO_STATE__;
const token = getToken();
injectResetStyle();
export const apolloClient = createApolloClient({
  batchRequests: true,
  initialState: preloadedState,
  apolloUri: process.env.GRAPHQL_ENDPOINT,
  headers: {
    authorization: `Bearer ${token}`,
  },
});

const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';
// Create the redux store by passing the "main" reducer, preloadedState, the Apollo Client
// and env. Passing either 'development' or 'production' (env) includes/excludes
// reduxDevTools, etc
const reduxStore = createBoldrStore(appReducer, preloadedState, apolloClient, env);

if (token) {
  // Update application state. User has token and is probably authenticated
  reduxStore.dispatch(checkAuth(token));
}
const AppComponent = PassedApp =>
  <BrowserRouter>
    <RouterConnection>
      <ThemeProvider>
        {PassedApp}
      </ThemeProvider>
    </RouterConnection>
  </BrowserRouter>;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const { AppContainer } = require('react-hot-loader');

  let Application = App;

  if (module && module.hot) {
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
  } else {
    render(
      wrapBoldrApp(
        AppComponent(
          <AppContainer>
            <App />
          </AppContainer>,
        ),
        apolloClient,
        reduxStore,
      ),
      DOM_NODE,
    );
  }
}

render(wrapBoldrApp(AppComponent(<App />), apolloClient, reduxStore), DOM_NODE);
