/* @flow */

import type { $Request, $Response, Middleware, NextFunction } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
// react router
import match from 'react-router/lib/match';
import RouterContext from 'react-router/lib/RouterContext';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import Helmet from 'react-helmet';
import { trigger } from 'redial';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { lightBlue100, lightBlue500, lightBlue700 } from 'material-ui/styles/colors';

import createRoutes from '../../../common/scenes';
import ApiClient from '../../../common/core/api/apiClient';
import configureStore from '../../../common/state/store';
import generateHTML from './generateHTML';

function boldrSSRMiddleware(request: $Request, response: $Response, next: NextFunction) {
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
  const apiClient = new ApiClient(request);
  // create memory history since we're technically an SPA
  const memoryHistory = createMemoryHistory(request.url);
  // redux store is initialized with the history as well as the client middleware
  const store = configureStore({}, memoryHistory, apiClient);
  // history is now kept in sync with the redux store
  const history = syncHistoryWithStore(memoryHistory, store);
  const routes = createRoutes(store);
  const { dispatch } = store;
  // match the url with the route, and data we might need.
  match({ history, routes, location: request.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      response.redirect(redirectLocation.pathname + redirectLocation.search);
    }

    if (error || !renderProps) {
      return next(error);
    }
    const { components } = renderProps;

         // Define locals to be provided to all lifecycle hooks:
    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,

           // Allow lifecycle hooks to dispatch Redux actions:
      dispatch,
    };

    trigger('fetch', components, locals)
     .then(() => {
       global.navigator = { userAgent: request.headers['user-agent'] };
       const preloadedState = store.getState();
       const muiTheme = getMuiTheme({
         palette: {
           primary1Color: lightBlue500,
           primary2Color: lightBlue700,
           primary3Color: lightBlue100,
         },
       }, {
         avatar: {
           borderColor: null,
         },
       });


       const componentRoot = renderToString(
          <Provider store={ store }>
            <MuiThemeProvider muiTheme={ muiTheme }>
            <RouterContext { ...renderProps } helpers={ apiClient } />
          </MuiThemeProvider>
          </Provider>,
        );

       const html = generateHTML({
         componentRoot,
         nonce,
         preloadedState,
         helmet: Helmet.rewind(),
       });

       response.status(200).send(html);
     }).catch((err) => {
       console.log(err);
       response.status(500).end();
     });
  });
}
export default (boldrSSRMiddleware: Middleware);
