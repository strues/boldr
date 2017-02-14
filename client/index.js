
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

import AppRoot from '../shared/components/AppRoot';
import App from '../shared/components/App';
import configureStore from '../shared/state/store';
import { checkAuth } from '../shared/state/modules/auth/actions';
import { getToken } from '../shared/core/services/token';
import ApiClient from '../shared/core/api/apiClient';
import createRoutes from '../shared/scenes';
import ReactHotLoader from './components/ReactHotLoader';

WebFontLoader.load({
  google: { families: ['Roboto:300,400,700', 'Material Icons'] },
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
};
if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!domNode || !domNode.firstChild || !domNode.firstChild.attributes ||
    !domNode.firstChild.attributes['data-react-checksum']) {
    console.error('Make sure that your initial render does not contain any client-side code.');
  }
}

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
require('./registerServiceWorker');

const unsubscribeHistory = renderApp();
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept(
    '../shared/scenes',
    () => {
      unsubscribeHistory();
      setTimeout(renderApp);
    }
  );
}
