import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
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
  const store = createStore(rootReducer, preloadedState, compose(
    applyMiddleware(...middleware),
    ...enhancers,
  ));

  // Hot reload
    /* istanbul ignore next */
  if (process.env.NODE_ENV === 'development') {
      /* istanbul ignore next */
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        const nextReducer = require('./reducers').default;
        store.replaceReducer(nextReducer);
      });
    }
  }

  return store;
}
