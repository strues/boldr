/* @flow */
/* eslint-disable global-require */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'react-router/lib/Router';
import match from 'react-router/lib/match';
import browserHistory from 'react-router/lib/browserHistory';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import { compose } from 'ramda';
import after from 'lodash/after';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from 'react-router-scroll/lib/useScroll';
import WebFontLoader from 'webfontloader';
import { trigger } from 'redial';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppRoot from '../shared/components/AppRoot';
import App from '../shared/components/App';
import configureStore from '../shared/state/store';
import { checkAuth } from '../shared/state/modules/account/actions';
import { getToken } from '../shared/core/services/token';
import ApiClient from '../shared/core/api/apiClient';
import createRoutes from '../shared/scenes';
import ReactHotLoader from './components/ReactHotLoader';

// Required for Material-UI
injectTapEventPlugin();
// Load fonts
WebFontLoader.load({
  google: { families: ['Roboto Slab:100,400,700', 'Roboto:300,400,700'] },
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

function triggerLocals(event) {
  return function() {
    const { components, location, params } = this.state;
    trigger(event, components, { dispatch, location, params });
  };
}

const onRouteUpdate = compose(
  after(2, triggerLocals('defer')),
  after(3, triggerLocals('fetch'))
);

const renderApp = () => (
  <ReactHotLoader errorReporter={ require('redbox-react') }>
    <AppRoot store={ store }>
        <Router
          history={ history }
          routes={ routes }
          helpers={ apiClient }
          render={ applyRouterMiddleware(useScroll()) }
        />
    </AppRoot>
  </ReactHotLoader>
);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept(
    '../shared/scenes',
    () => {
      require('../shared/scenes'),
      render(renderApp(), domNode);
    }
  );
}
render(renderApp(), domNode);

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
require('./registerServiceWorker');
