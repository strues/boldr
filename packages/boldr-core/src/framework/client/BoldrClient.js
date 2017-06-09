/**
 * @module boldr/framework/client/client
 */
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { ApolloProvider } from 'react-apollo';
import { createBatchingNetworkInterface } from 'apollo-client';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { cyan, pink } from 'material-ui/styles/colors';
import getDefault from '../../internal/getDefault';
import defaultConfig from '../../config/default.client';

import createStore from '../shared/createStore';
import createApolloClient from '../shared/createApolloClient';

function createStyleManager() {
  return MuiThemeProvider.createDefaultContext({
    theme: createMuiTheme({
      palette: createPalette({
        primary: cyan,
        accent: pink,
        type: 'light',
      }),
    }),
  });
}

export default userConfig => {
  const config = { ...defaultConfig, ...userConfig };

  const { defaultHeadAttributes } = config;
  const AppContainer = getDefault(require('@@AppContainer'));
  // click helper required for Material-UI
  injectTapEventPlugin();

  // Does the user's browser support the HTML5 history API?
  // If the user's browser doesn't support the HTML5 history API then we
  // will force full page refreshes on each page change.
  const supportsHistory = 'pushState' in window.history;
  // Apollo network interface
  const networkInterface = createBatchingNetworkInterface({
    opts: {
      credentials: 'same-origin',
    },
    batchInterval: 20,
    uri: '/api/v1/graphql',
  });
  networkInterface.use([
    {
      applyBatchMiddleware(req, next) {
        // If headers dont exist for some reason
        // create them.
        if (!req.options.headers) {
          req.options.headers = {};
        }

        // Add our auth token to the headers
        // Authorization: 'Bearer Token'
        // if (token) {
        //   req.options.headers.authorization = `Bearer ${token}`;
        // }
        next();
      },
    },
  ]);
  const client = createApolloClient(networkInterface);
  const history = createHistory();
  const store = createStore(client, history);
  const { styleManager, theme } = createStyleManager();

  const MOUNT_NODE = document.getElementById('app');

  let render = () => {
    const headHtml = { ...defaultHeadAttributes, ...(window.___LAYOUT__ || {}) };

    ReactDOM.render(
      <ApolloProvider client={client} {...{ store }}>
        <ConnectedRouter history={history} forceRefresh={!supportsHistory}>
          <MuiThemeProvider styleManager={styleManager} theme={theme}>
            <AppContainer
              {...{
                store,
                headHtml,
              }}
            />
          </MuiThemeProvider>
        </ConnectedRouter>
      </ApolloProvider>,
      MOUNT_NODE,
    );
  };

  if (__DEV__ && module.hot) {
    const renderApp = render;
    const renderError = error => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    render = () => {
      try {
        renderApp();
      } catch (error) {
        renderError(error);
      }
    };

    module.hot.accept(['routes'], () => render());
  }

  render();
};
