/* @flow */
/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { ApolloProvider } from 'react-apollo';
import { checkAuth } from '../../scenes/Account/state/actions';
import { getToken } from '../authentication/token';
import configureStore from '../store';
import RouterConnection from '../RouterConnection';
import apolloClient from '../createApolloClient';
import ReactHotLoader from '../util/ReactHotLoader';
import App from '../App';

const MOUNT_POINT = document.getElementById('app');
// Load the JWT if it exists.
// Get token will return null if it does not exist
const token = getToken();

const history = createBrowserHistory();
const preloadedState = window.__APOLLO_STATE__;
const store = configureStore(apolloClient, preloadedState, history);

if (token) {
  // Update application state. User has token and is probably authenticated
  store.dispatch(checkAuth(token));
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
