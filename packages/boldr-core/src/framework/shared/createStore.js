/**
 * @module boldr/framework/shared/createStore
 */
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { enableBatching } from 'redux-batched-actions';
import invariant from 'invariant';
import getDefault from '../../internal/getDefault';

const preReducers = [];

function addPreReducer(reducers) {
  if (typeof reducers === 'function') {
    preReducers.push(reducers);
  } else if (Array.isArray(reducers)) {
    preReducers.push(...reducers);
  }
}

function preApplyReducer(reducer) {
  if (preReducers.length === 0) {
    return reducer;
  }
  const newReducer = (state, action) => {
    const newState = preReducers.reduce(
      (accumulatedState, r) => r(accumulatedState, action),
      state,
    );
    return reducer(newState, action);
  };
  return newReducer;
}

export default (apolloClient, history) => {
  // const { middlewares, customEnhancers } = config;
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [thunk, apolloClient.middleware(), reduxRouterMiddleware];

  // Check if the logger middleware is enabled in the config
  if (process.env.NODE_ENV === 'development') {
    const loggerOptions = {};
    const { createLogger } = require('redux-logger');
    const logger = createLogger(loggerOptions);

    middleware.push(logger);
  }

  const enhancers = [];
  if (__DEV__ && typeof window !== 'undefined' && window) {
    // eslint-disable-next-line
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  /**
     * Return the Boldr reducer
     * @param  {function|Object} appReducer [description]
     * @return {function}            [description]
     */
  function getReducer(appReducer) {
    let reducerObject = {};
    if (typeof appReducer === 'object') {
      reducerObject = Object.assign({}, appReducer);
    } else if (typeof appReducer === 'function') {
      reducerObject = { app: appReducer };
    }
    if (!reducerObject.apollo) {
      reducerObject.apollo = apolloClient.reducer();
    }
    if (!reducerObject.router) {
      reducerObject.router = routerReducer;
    }
    return enableBatching(preApplyReducer(combineReducers(reducerObject)));
  }
  // Load the user's reducers
  const appReducer = getDefault(require('@@AppReducers'));
  const reducer = getReducer(appReducer);

  const store = compose(applyMiddleware(...middleware), ...enhancers)(createStore)(
    reducer,
    typeof window !== 'undefined' ? window.___APOLLO_STATE__ : {},
  );

  if (module.hot) {
    module.hot.accept('@@AppReducers', () => {
      const reducers = getDefault(require('@@AppReducers'));
    });
  }

  return store;
};
