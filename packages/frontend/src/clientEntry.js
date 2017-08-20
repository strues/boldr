/* eslint-disable prefer-destructuring, no-underscore-dangle, new-cap */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { ThemeProvider } from 'styled-components';
import { getToken } from '@boldr/auth';
import { createApolloClient, createBoldrStore, RouterConnection, wrapBoldrApp } from '@boldr/core';
import { checkAuth } from './scenes/Account/state/actions';
import { GRID_SETTINGS } from './components/Layout/constants';

import App from './components/App';
import appReducer from './reducers';

const DOM_NODE = document.getElementById('app');
const preloadedState = window.__APOLLO_STATE__;
const token = getToken();

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
      <ThemeProvider theme={{ boldrgrid: GRID_SETTINGS }}>
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

// if (process.env.NODE_ENV !== 'production') {
//     let createClass = React.createClass;
//     Object.defineProperty(React, 'createClass', {
//       set: (nextCreateClass) => {
//         createClass = nextCreateClass;
//       }
//     });
//     console.log('wrapping with whyDidYouUpdate');
//     const { whyDidYouUpdate } = require('why-did-you-update');
//     whyDidYouUpdate(React);
// }
render(wrapBoldrApp(AppComponent(<App />), apolloClient, reduxStore), DOM_NODE);
