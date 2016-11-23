/* @flow */
import type { $Request, $Response, Middleware } from 'express';
import React from 'react';
import { Provider } from 'react-redux';
// react router
import match from 'react-router/lib/match';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import { syncHistoryWithStore } from 'react-router-redux';
// async data fetching
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import ApiClient from '../common/core/services/ApiClient';
import createRoutes from '../common/scenes';
import configureStore from '../common/state/store';
import render from './render';

/**
 * An express middleware that is capabable of doing React server side rendering.
 */
function universalReactAppMiddleware(request: $Request, response: $Response) {
  global.navigator = { userAgent: request.headers['user-agent'] };
  if (process.env.DISABLE_SSR === 'true') {
    if (process.env.NODE_ENV === 'development') {
      console.log('==> Handling react route without SSR');  // eslint-disable-line no-console
    }
    // SSR is disabled so we will just return an empty html page and will
    // rely on the client to initialize and render the react application.
    const html = render();
    response.status(200).send(html);
    return;
  }
  // API request helper
  const client = new ApiClient(request);
  // create memory history since we're technically an SPA
  const memHistory = createMemoryHistory(request.url);
  // redux store is initialized with the history as well as the client middleware
  const store = configureStore({}, memHistory, client);
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
        const component = (
            <Provider store={ store } key="provider">
              <ReduxAsyncConnect { ...renderProps } />
            </Provider>
          );

        const html = render(component, preloadedState);

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
