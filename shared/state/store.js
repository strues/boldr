import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createReducer from './reducers';
import createMiddleware from './clientMiddleware';

export default function configureStore(preloadedState, history, apiClient) {
  const reduxRouterMiddleware = routerMiddleware(history);
  const middleware = [thunkMiddleware, createMiddleware(apiClient), reduxRouterMiddleware];

  const enhancers = [
    applyMiddleware(...middleware),
  ];

  /**
   * Redux DevTools Extension
   */
     /* istanbul ignore next */
     /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
       process.env.NODE_ENV !== 'production' &&
       typeof window === 'object' &&
       window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
     /* eslint-enable */
  // Creating the store
  const store = createStore(createReducer(), preloadedState, composeEnhancers(...enhancers));
  store.asyncReducers = {};
  // Hot reload
    /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      System.import('./reducers').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
}
