/* @flow */
/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import WebFontLoader from 'webfontloader';
import ApolloProvider from 'react-apollo/lib/ApolloProvider';
import { createBatchingNetworkInterface } from 'apollo-upload-client';
import { checkAuth } from '../../scenes/Account/state/actions';
import { getToken } from '../authentication/token';
import configureStore from '../store';
import RouterConnection from '../RouterConnection';
import createApolloClient from '../createApolloClient';
import ReactHotLoader from '../util/ReactHotLoader';
import App from '../App';

// Async font loading
WebFontLoader.load({
  google: {
    families: ['Roboto:300,600', 'Chivo:400,600'],
  },
});

const MOUNT_POINT = document.getElementById('app');
// Load the JWT if it exists.
// Get token will return null if it does not exist
const token = getToken();

// Apollo network interface
const networkInterface = createBatchingNetworkInterface({
  uri: process.env.BOLDR_GRAPHQL_URL,
  batchInterval: 10,
});
networkInterface.use([
  {
    applyBatchMiddleware(req, next) {
      // If headers don't exist for some reason
      // create them.
      if (!req.options.headers) {
        req.options.headers = {};
      }

      // Add our auth token to the headers
      // Authorization: 'Bearer Token'
      if (token) {
        req.options.headers.authorization = `Bearer ${token}`;
      }
      next();
    },
  },
]);
const apolloClient = createApolloClient(networkInterface);
const history = createBrowserHistory();
const preloadedState = window.__APOLLO_STATE__;
const store = configureStore(apolloClient, preloadedState, history);
const { dispatch } = store;

if (token) {
  // Update application state. User has token and is probably authenticated
  dispatch(checkAuth(token));
}
function renderApp(passedApp) {
  ReactDOM.render(
    <ReactHotLoader>
      <ApolloProvider store={store} client={apolloClient}>
        <BrowserRouter>
          <RouterConnection>
            {passedApp}
          </RouterConnection>
        </BrowserRouter>
      </ApolloProvider>
    </ReactHotLoader>,
    MOUNT_POINT,
  );
}

if (module.hot) {
  module.hot.accept('../App', () => {
    const NewApp = require('../App').default;
    renderApp(<NewApp />);
  });
}

renderApp(<App />);
