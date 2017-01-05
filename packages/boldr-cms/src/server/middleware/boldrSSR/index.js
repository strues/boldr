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
import AppRoot from '../../../shared/components/AppRoot';
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
  if (typeof res.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }
  const nonce = res.locals.nonce;

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

  const apiClient = new ApiClient(req);
  const memoryHistory = createMemoryHistory(req.url);
  const store = createStore(req, memoryHistory, apiClient);

  const history = syncHistoryWithStore(memoryHistory, store);
  const routes = createRoutes(store);

  const { dispatch, getState } = store;

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error || !renderProps) {
      return next(error);
    }
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    }
    const { components } = renderProps;
    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,
      dispatch,
    };

    trigger('fetch', components, locals)
       .then(() => {
         const AppRender = (store, renderProps) => renderToString(
            <AppRoot store={ store }>
              <RouterContext { ...renderProps } helpers={ apiClient } />
            </AppRoot>,
          );
         const preloadedState = store.getState();
         const reactAppString = AppRender(store, renderProps);
         const helmet = Helmet.rewind();

         const html = generateHTML({ reactAppString, nonce, preloadedState, helmet });

         res.status(200).send(html);
       }).catch((err) => {
         console.log(err);
         res.status(500).end();
       });
  });
}

export default (boldrSSR: Middleware);
