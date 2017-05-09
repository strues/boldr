/* @flow */
/* eslint-disable global-require */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import WebFontLoader from 'webfontloader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import muiTheme from '../shared/templates/muiTheme';
import renderRoutes from '../shared/core/addRoutes';
import routes from '../shared/routes';
import configureStore from '../shared/state/store';
import { checkAuth } from '../shared/state/modules/auth/actions';
import { getToken } from '../shared/core/authentication/token';

injectTapEventPlugin();

WebFontLoader.load({
  google: { families: ['Roboto:200,400,600', 'Material Icons'] },
  custom: {
    families: ['FontAwesome'],
    urls: [
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
    ],
  },
});
// if (process.env.NODE_ENV !== 'production') {
//   const { whyDidYouUpdate } = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }
const domNode = document.getElementById('app');
const history = createHistory();
const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(history, preloadedState);

const { dispatch } = store;

const token = getToken();
if (!!token) {
  // Update application state. User has token and is probably authenticated
  dispatch(checkAuth(token));
}

const renderApp = () => {
  store.dispatch({
    type: '@boldr/INITIAL_PAGE_LOAD',
    initialPageLoad: false,
  });
  // const App = require('../shared/components/App').default;
  render(
    <Provider store={store}>
      <ConnectedRouter history={history} routes={routes[0].routes}>
        <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
          {renderRoutes(routes)}
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>,
    domNode,
  );
};

if (process.env.NODE_ENV !== 'production') {
  window.React = React;
}

if (process.env.NODE_ENV === 'production') {
  // This registers our service worker for asset caching and offline support.
  // Keep this as the last item, just in case the code execution failed (thanks
  // to react-boilerplate for that tip.)
  require('./registerServiceWorker');
}
if (module.hot) {
  const reRenderApp = () => {
    try {
      renderApp(require('../shared/routes'));
    } catch (error) {
      const RedBox = require('redbox-react').default;

      render(<RedBox error={error} />, domNode);
    }
  };
  module.hot.accept('../shared/routes', () => {
    setImmediate(() => {
      // Preventing the hot reloading error from react-router
      unmountComponentAtNode(domNode);
      reRenderApp();
    });
  });
}
renderApp();
