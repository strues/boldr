import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import getReducers from '../state/reducers';

const inBrowser = typeof window === 'object';

export default function configureStore(apolloClient, preloadedState, history) {
  const middleware = [apolloClient.middleware(), thunkMiddleware];

  const enhancers = [applyMiddleware(...middleware)];
  /* istanbul ignore next */
  const devEnhancers =
    process.env.NODE_ENV !== 'production' &&
    inBrowser &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  // Creating the store
  const store = createStore(getReducers(apolloClient), preloadedState, devEnhancers(...enhancers));

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('../state/reducers', () => {
      const nextRootReducer = require('../state/reducers').default; // eslint-disable-line

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
