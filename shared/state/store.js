import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import createMiddleware from './clientMiddleware';

export default function configureStore(preloadedState, history, apiClient) {
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [
    thunkMiddleware,
    createMiddleware(apiClient),
    reduxRouterMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middleware),
  ];

  /* istanbul ignore next */
  const devEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  // Creating the store
  const store = createStore(rootReducer, preloadedState, devEnhancers(...enhancers));

  // Hot reload
    /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
