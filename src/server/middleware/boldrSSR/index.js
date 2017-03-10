import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import match from 'react-router/lib/match';
import RouterContext from 'react-router/lib/RouterContext';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import styleSheet from 'styled-components/lib/models/StyleSheet';
import Helmet from 'react-helmet';

import AppRoot from '../../../shared/components/AppRoot';
import createRoutes from '../../../shared/scenes';
import ApiClient from '../../../shared/core/api/apiClient';
import configureStore from '../../../shared/state/store';
import config from '../../../../config';
import ServerHTML from './ServerHTML';

const debug = require('debug')('boldr:ssrMW');

function renderAppToString(store, renderProps, apiClient) {
  return renderToString(
    <AppRoot store={ store }>
      <RouterContext { ...renderProps } helpers={ apiClient } />
    </AppRoot>,
  );
}

function boldrSSR(req, res, next) {
  if (typeof res.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }

  const nonce = res.locals.nonce;

  global.navigator = { userAgent: req.headers['user-agent'] };

  const createStore = req => configureStore({});

  const apiClient = new ApiClient(req);
  const memoryHistory = createMemoryHistory(req.url);
  const store = createStore(req, memoryHistory, apiClient);

  const history = syncHistoryWithStore(memoryHistory, store);
  const routes = createRoutes(store);

  const { dispatch, getState } = store;

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) return res.status(500).json(error);
    if (!renderProps) return res.status(404);
    if (redirectLocation) return res.redirect(redirectLocation.pathname + redirectLocation.search);

    const promises = renderProps.components
      .filter(component => component.fetchData)
      .map(component => component.fetchData(store.dispatch, renderProps.params));

    Promise.all(promises)
       .then((data) => {
         const preloadedState = store.getState();
         const reactAppString = renderAppToString(store, renderProps, apiClient);

         const helmet = Helmet.rewind();
         // render styled-components styleSheets to string.
         const styles = styleSheet.rules().map(rule => rule.cssText).join('\n');

         const html = renderToStaticMarkup(
           <ServerHTML
             reactAppString={ reactAppString }
             nonce={ nonce }
             helmet={ Helmet.rewind() }
             styles={ styles }
             preloadedState={ preloadedState }
           />,
         );
         return res.status(200).send(`<!DOCTYPE html>${html}`);
       }).catch((err) => {
         debug(err);
         return res.status(500).send(err);
       });
  });
}

export default boldrSSR;
