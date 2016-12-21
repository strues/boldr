/* @flow */
/* eslint-disable global-require */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';

import Router from 'react-router/lib/Router';
import match from 'react-router/lib/match';
import browserHistory from 'react-router/lib/browserHistory';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';

import { syncHistoryWithStore } from 'react-router-redux';
import WebFontLoader from 'webfontloader';
import { trigger } from 'redial';

import useScroll from 'react-router-scroll/lib/useScroll';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { getToken } from '../common/core/services/token';
import ApiClient from '../common/core/api/apiClient';
import configureStore from '../common/state/store';
import { checkAuth } from '../common/state/dux/auth';
import createRoutes from '../common/scenes';
import materialStyle from '../common/theme/material';
import ReactHotLoader from './components/ReactHotLoader';
import WrappedRedBox from './components/WrappedRedbox';

// Required for Material-UI
injectTapEventPlugin();
// Load fonts
WebFontLoader.load({
  google: { families: ['Roboto Slab:100,400,700', 'Roboto:300,400,700'] },
});

// Get the DOM Element where we mount React
const MOUNT_POINT = document.getElementById('app');
// Superagent helper
const apiClient = new ApiClient();
// inject browserHistory, our state, and the superagent helper
const store = configureStore(window.PRELOADED_STATE, browserHistory, apiClient);
// bootstrap materialui theme
const muiTheme = getMuiTheme(materialStyle);
const { dispatch } = store;
const token = getToken();
if (token) {
  // Update application state. User has token and is probably authenticated
  dispatch(checkAuth(token));
}

const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store, history);

function renderApp() {
  render(
      <ReactHotLoader errorReporter={ WrappedRedBox }>
        <Provider store={ store } key="provider">
          <MuiThemeProvider muiTheme={ muiTheme }>
         <Router
           history={ history }
           routes={ routes }
           helpers={ apiClient }
           render={ applyRouterMiddleware(useScroll()) }
         />
        </MuiThemeProvider>
        </Provider>
      </ReactHotLoader>,
      MOUNT_POINT,
    );

  return history.listen(location => {
    // Match routes based on location object:
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (error) console.log(error);
      const { components } = renderProps;
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,

        dispatch,
      };
      if (window.PRELOADED_STATE) {
        delete window.PRELOADED_STATE;
      } else {
        trigger('fetch', components, locals);
      }
      trigger('defer', components, locals);
    });
  });
}
// The following is needed so that we can support hot reloading our application.
if (process.env.NODE_ENV === 'development' && module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept('./index.js');
  // Any changes to our App will cause a hotload re-render.
  module.hot.accept(
    '../common/scenes',
    () => {
      unmountComponentAtNode(MOUNT_POINT);
      renderApp(require('../common/scenes').default);
    },
  );
}

renderApp();

if (process.env.NODE_ENV === 'production') {
  require('./registerServiceWorker'); // eslint-disable-line global-require
}
