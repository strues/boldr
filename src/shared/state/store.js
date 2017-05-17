import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import api from '../core/api';
import getReducers from './reducers';

const inBrowser = typeof window === 'object';

export default function configureStore(apolloClient, preloadedState, history) {
  const reduxRouterMiddleware = routerMiddleware(history);
  const middleware = [
    thunkMiddleware.withExtraArgument(api),
    apolloClient.middleware(),
    reduxRouterMiddleware,
  ];

  const enhancers = [applyMiddleware(...middleware)];
  // Here we only want to include redux-logger during development.
  /* istanbul ignore next */
  if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);
    middleware.push(logger);
  }

  /* istanbul ignore next */
  const devEnhancers = process.env.NODE_ENV !== 'production' &&
    inBrowser &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

  // Creating the store
  const store = createStore(
    getReducers(apolloClient),
    preloadedState,
    devEnhancers(...enhancers),
  );

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default; // eslint-disable-line

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
