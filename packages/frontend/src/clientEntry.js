/* eslint-disable prefer-destructuring, no-underscore-dangle, new-cap */
// import 'isomorphic-fetch';
import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { getToken } from '@boldr/auth';
import {
  renderBoldrApp,
  createApolloClient,
  createBoldrStore,
  RouterConnection,
} from '@boldr/core';
import { checkAuth } from './scenes/Account/state/actions';

import App from './components/App';
import appReducer from './reducers';

const preloadedState = window.__APOLLO_STATE__;
const token = getToken();
export const apolloClient = createApolloClient({
  batchRequests: true,
  initialState: preloadedState,
  apolloUri: 'http://localhost:2121/api/v1/graphql',
  headers: {
    authorization: `Bearer ${token}`,
  },
});

const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const reduxStore = createBoldrStore(appReducer, preloadedState, apolloClient, env);
if (token) {
  // Update application state. User has token and is probably authenticated
  reduxStore.dispatch(checkAuth(token));
}
const AppComponent = PassedApp =>
  <BrowserRouter>
    <RouterConnection>
      {PassedApp}
    </RouterConnection>
  </BrowserRouter>;

renderBoldrApp(AppComponent(<App />), apolloClient, reduxStore);

if (process.env.NODE_ENV === 'development') {
  module.hot.accept('./components/App/App.js', () => {
    const NextApp = require('./components/App/App.js').default;

    renderBoldrApp(AppComponent(<NextApp />), apolloClient, reduxStore);
  });
}
