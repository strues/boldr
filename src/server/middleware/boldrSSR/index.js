/* @flow */

import type { $Request, $Response, Middleware } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
// react router
import match from 'react-router/lib/match';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import Helmet from 'react-helmet';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { lightBlue100, lightBlue500, lightBlue700 } from 'material-ui/styles/colors';
// async data fetching
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import createRoutes from '../../../common/scenes';
import ApiClient from '../../../common/core/api/apiClient';
import configureStore from '../../../common/state/store';
import generateHTML from './generateHTML';
/**
 * An express middleware that is capabable of doing React server side rendering.
 */
function universalReactAppMiddleware(request: $Request, response: $Response) {
  // We should have had a nonce provided to us.  See the server/index.js for
  // more information on what this is.
  if (typeof response.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }
  const nonce = response.locals.nonce;

  // It's possible to disable SSR, which can be useful in development mode.
  // In this case traditional client side only rendering will occur.
  if (process.env.DISABLE_SSR === 'true') {
    if (process.env.NODE_ENV === 'development') {
      console.log('==> Handling react route without SSR');  // eslint-disable-line no-console
    }
    // SSR is disabled so we will just return an empty html page and will
    // rely on the client to initialize and render the react application.
    const html = generateHTML({
      // Nonce which allows us to safely declare inline scripts.
      nonce,
    });
    response.status(200).send(html);
    return;
  }
  // Superagent helper
  const client = new ApiClient(request);
  // create memory history since we're technically an SPA
  const memHistory = createMemoryHistory(request.url);
  // redux store is initialized with the history as well as the client middleware
  const store = configureStore(memHistory, client);
  // history is now kept in sync with the redux store
  syncHistoryWithStore(memHistory, store);

  // match the url with the route, and data we might need.
  match({ routes: createRoutes(store), location: request.url }, (err, redirect, renderProps) => {
    if (err) {
      response.status(500).json(err);
    } else if (redirect) {
      response.redirect(302, redirect.pathname + redirect.search);
    } else if (renderProps) {
      // execute rendering and data hydration on the server, then send
      // it to the client to render.
      loadOnServer({ ...renderProps, store, helpers: { client } })
      .then(() => {
        const preloadedState = store.getState();
        const muiTheme = getMuiTheme({
          palette: {
            primary1Color: '#0376a3',
            primary2Color: lightBlue700,
            primary3Color: lightBlue100,
          },
        }, {
          avatar: {
            borderColor: null,
          },
          userAgent: request.headers['user-agent'],
        });
          // Create our application and render it into a string.
        const component = renderToString(
          <Provider store={ store } key="provider">
            <MuiThemeProvider muiTheme={ muiTheme }>
            <ReduxAsyncConnect { ...renderProps } />
          </MuiThemeProvider>
          </Provider>,
        );

        // Generate the html response.
        const html = generateHTML({
          // Provide the full app react element.
          component,
          // Nonce which allows us to safely declare inline scripts.
          nonce,
          preloadedState,
          // Running this gets all the helmet properties (e.g. headers/scripts/title etc)
          // that need to be included within our html.  It's based on the rendered app.
          // @see https://github.com/nfl/react-helmet
          helmet: Helmet.rewind(),
        });

        return response.status(200).send(html);
      }).catch((mountError) => {
        console.error('MOUNT ERROR:', mountError.stack);
        return response.status(500);
      });
    } else {
      response.status(404).send('Not found');
    }
  });
}

export default (universalReactAppMiddleware: Middleware);
