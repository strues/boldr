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
import { ReduxAsyncConnect } from 'redux-connect';
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

injectTapEventPlugin();
WebFontLoader.load({
  google: { families: ['Poppins:300,400,600'] },
});

// Superagent helper
const client = new ApiClient();
const preloadedState = window.PRELOADED_STATE || {};
const store = configureStore(browserHistory, preloadedState, client);
const muiTheme = getMuiTheme(materialStyle);
const token = getToken();
if (token) {
  // Update application state. User has token and is probably authenticated
  store.dispatch(checkAuth(token));
}
// Get the DOM Element that will host our React application.
const MOUNT_POINT = document.getElementById('app');
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.routing,
});
const routes = createRoutes(store, history);

function renderApp() {
  const { pathname, search, hash } = window.location;
  const location = `${pathname}${search}${hash}`;
  // wrapper to make redux-connect applyRouterMiddleware compatible see
  // https://github.com/taion/react-router-scroll/issues/3
  const useReduxAsyncConnect = () => ({
    renderRouterContext: (child, props) => (
      <ReduxAsyncConnect { ...props } helpers={ { client } } filter={ item => !item.deferred }>
        { child }
      </ReduxAsyncConnect>
    ),
  });

  const middleware = applyRouterMiddleware(useScroll(), useReduxAsyncConnect());
  // Match routes based on location object:
  match({ routes, location }, () => {
    render(
      <ReactHotLoader errorReporter={ WrappedRedBox }>
        <Provider store={ store } key="provider">
          <MuiThemeProvider muiTheme={ muiTheme }>
          <Router routes={ routes } history={ history } render={ middleware } key={ Math.random() } />
        </MuiThemeProvider>
        </Provider>
      </ReactHotLoader>,
      MOUNT_POINT,
    );
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
