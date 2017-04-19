/* eslint-disable dot-notation */
import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import api from '../core/api';
import rootReducer from './reducers';

export default function configureStore(preloadedState, history) {
  const reduxRouterMiddleware = routerMiddleware(history);

  const middlewares = [thunk.withExtraArgument(api), reduxRouterMiddleware];
  if (IS_DEV) {
    const {createLogger} = require('redux-logger');

    const logger = createLogger({collapsed: true});
    middlewares.push(logger);
  }
  const enhancers = [
    applyMiddleware(...middlewares),
    IS_DEV &&
      typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f,
  ];

  // Creating the store
  const store = createStore(rootReducer, preloadedState, compose(...enhancers));

  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
