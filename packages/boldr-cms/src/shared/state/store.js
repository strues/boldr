import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import createMiddleware from './clientMiddleware';

export default function configureStore(preloadedState, history, apiClient) {
  const logger = createLogger({
    // Ignore `CHANGE_FORM` actions in the logger, since they fire after every keystroke
    predicate: (getState, action) => action.type !== 'CHANGE_FORM',
  });
  const reduxRouterMiddleware = routerMiddleware(history);
  const middleware = [logger, thunkMiddleware, createMiddleware(apiClient), reduxRouterMiddleware];

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
        const nextReducer = require('./reducers').default
        store.replaceReducer(nextReducer)
      });
    }
  }

  return store;
}
