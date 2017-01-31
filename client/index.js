/* @flow */
/* eslint-disable global-require */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'react-router/lib/Router';
import match from 'react-router/lib/match';
import browserHistory from 'react-router/lib/browserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import WebFontLoader from 'webfontloader';
import { trigger } from 'redial';

import AppRoot from '../shared/components/AppRoot';
import App from '../shared/components/App';
import configureStore from '../shared/state/store';
import { checkAuth } from '../shared/state/modules/account/actions';
import { getToken } from '../shared/core/services/token';
import ApiClient from '../shared/core/api/apiClient';
import createRoutes from '../shared/scenes';
import ReactHotLoader from './components/ReactHotLoader';

WebFontLoader.load({
  google: { families: ['Roboto:300,400,700', 'Material Icons'] }
});
// Get the DOM Element that will host our React application.
const domNode = document.getElementById('app');
// Superagent helper
const apiClient = new ApiClient();

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState, browserHistory, apiClient);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store, history);
const { dispatch } = store;

const token = getToken();
if (token) {
  // Update application state. User has token and is probably authenticated
  dispatch(checkAuth(token));
}

const renderApp = () => {
  const { pathname, search, hash } = window.location;
  const location = `${pathname}${search}${hash}`;
  match({ routes, location }, () => {
    render(
      <ReactHotLoader>
        <AppRoot store={ store }>
          <Router
            history={ history }
            routes={ routes }
            helpers={ apiClient }
          />
        </AppRoot>
      </ReactHotLoader>,
      domNode
    );
  });

  return browserHistory.listen(location => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (error) console.log(error);
      // Get array of route handler components:
      const { components } = renderProps;

      // Define locals to be provided to all lifecycle hooks:
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,

        // Allow lifecycle hooks to dispatch Redux actions:
        dispatch,
      };

      // Don't fetch data for initial route, server has already done the work:
      if (window.__PRELOADED_STATE__) {
        // Delete initial data so that subsequent data fetches can occur:
        delete window.__PRELOADED_STATE__;
      } else {
        // Fetch mandatory data dependencies for 2nd route change onwards:
        trigger('fetch', components, locals);
      }

      // Fetch deferred, client-only data dependencies:
      trigger('defer', components, locals);
    });
  });
};

const unsubscribeHistory = renderApp();

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
require('./registerServiceWorker');

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept(
    '../shared/scenes',
    () => {
      unsubscribeHistory();
      setTimeout(renderApp);
    }
  );
}
