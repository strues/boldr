/* @flow */

import type { $Request, $Response, Middleware, NextFunction } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import match from 'react-router/lib/match';
import RouterContext from 'react-router/lib/RouterContext';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import Helmet from 'react-helmet';
import { trigger } from 'redial';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import material from '../../../shared/theme/Boldr/material';
import App from '../../../shared/components/App';
import createRoutes from '../../../shared/scenes';
import ApiClient from '../../../shared/core/api/apiClient';
import configureStore from '../../../shared/state/store';
import config from '../../../../config';
import generateHTML from './generateHTML';

/**
 * An express middleware that is capabable of service our React application,
 * supporting server side rendering of the application.
 */
function boldrSSR(req: $Request, res: $Response, next: NextFunction) {
  // We should have had a nonce provided to us.  See the server/index.js for
  // more information on what this is.
  if (typeof res.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }
  const nonce = res.locals.nonce;

  // It's possible to disable SSR, which can be useful in development mode.
  // In this case traditional client side only rendering will occur.
  if (config.disableSSR) {
    if (process.env.NODE_ENV === 'development') {
      console.log('==> Handling react route without SSR');  // eslint-disable-line no-console
    }
    // SSR is disabled so we will just return an empty html page and will
    // rely on the client to initialize and render the react application.
    const html = generateHTML({
      // Nonce which allows us to safely declare inline scripts.
      nonce,
    });
    res.status(200).send(html);
    return;
  }
  const getHost = req =>
    `${req.headers['x-forwarded-proto'] || req.protocol}://${req.headers.host}`;

  global.navigator = { userAgent: req.headers['user-agent'] };

  const createStore = req => configureStore({
    boldr: {
      meta: {
        host: getHost(req),
      },
    },
  });

  // Superagent helper
  const apiClient = new ApiClient(req);
  // create memory history since we're technically an SPA
  const memoryHistory = createMemoryHistory(req.url);
  const store = createStore(req, memoryHistory, apiClient);

  const history = syncHistoryWithStore(memoryHistory, store);
  const routes = createRoutes(store);


  const { dispatch, getState } = store;
    // match the url with the route, and data we might need.
  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
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
         global.navigator = { userAgent: req.headers['user-agent'] };
         const preloadedState = store.getState();
         const muiTheme = getMuiTheme(material);


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

         res.status(200).send(html);
       }).catch((err) => {
         console.log(err);
         res.status(500).end();
       });
  });
}

export default (boldrSSR: Middleware);
