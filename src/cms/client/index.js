/* @flow */
/* eslint-disable global-require */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import { syncHistoryWithStore } from 'react-router-redux';
import WebFontLoader from 'webfontloader';
import { ReduxAsyncConnect } from 'redux-connect';
import useScroll from 'react-router-scroll/lib/useScroll';
import ApiClient from '../common/core/services/ApiClient';
import configureStore from '../common/state/store';
import { checkAuth } from '../common/state/dux/auth';
import { TOKEN_KEY } from '../common/core';
import getRoutes from '../common/scenes';
import ReactHotLoader from './components/ReactHotLoader';

WebFontLoader.load({
  google: { families: ['Work Sans:300,400,600'] },
});

const preloadedState = window.PRELOADED_STATE || {};
const client = new ApiClient();
const store = configureStore(browserHistory, client, preloadedState);

const token = localStorage.getItem(TOKEN_KEY);

if (token) {
  // Update application state. User has token and is probably authenticated
  store.dispatch(checkAuth(token));
}
// Get the DOM Element that will host our React application.
const MOUNT_POINT = document.getElementById('app');
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.routing,
});
const routes = getRoutes(store, history);
function renderApp() {
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
  render(
    <ReactHotLoader>
      <Provider store={ store } key="provider">
        <Router routes={ routes } history={ history } render={ middleware } key={ Math.random() } />
      </Provider>
    </ReactHotLoader>,
    MOUNT_POINT,
  );
}
// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update')
//   whyDidYouUpdate(React)
// }
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
