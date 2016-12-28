import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createReducer from './reducers';
import createMiddleware from './clientMiddleware';

export default function configureStore(preloadedState, history, apiClient) {
  const reduxRouterMiddleware = routerMiddleware(history);
  const middleware = [thunkMiddleware, createMiddleware(apiClient), reduxRouterMiddleware];

  // Development enhancers
  const enhancers = [];

  /**
   * Redux DevTools Extension
   */
     /* istanbul ignore next */
  if (process.env.NODE_ENV === 'development' && typeof window === 'object') {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  // Creating the store
  const store = createStore(createReducer(), preloadedState, compose(
    applyMiddleware(...middleware),
    ...enhancers,
  ));
  // async reducers we can inject based on the route.
  store.asyncReducers = {};
  // Hot reload
    /* istanbul ignore next */
  if (process.env.NODE_ENV === 'development') {
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
  }

  return store;
}
