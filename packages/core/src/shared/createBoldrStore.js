/**
 * @module boldr-core/shared/createBoldrStore
 */
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import invariant from 'invariant';
import { routerReducer } from './RouterConnection';
import boldrReducer from './boldr/reducer';

const preReducers = [];

const middlewares = [thunk];

export function addPreReducer(reducers) {
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

/**
 * Return the CMF reducer
 * @param  {function|Object} appReducer [description]
 * @return {function}            [description]
 */
export function getReducer(appReducer, apolloClient) {
  let reducerObject = {};
  if (appReducer) {
    if (typeof appReducer === 'object') {
      reducerObject = Object.assign({}, appReducer);
    } else if (typeof appReducer === 'function') {
      reducerObject = { app: appReducer };
    }
  } else {
    invariant(true, 'Are you sure you want to bootstrap an app without reducers ?');
  }
  if (!reducerObject.boldr) {
    reducerObject.boldr = boldrReducer;
  }
  if (!reducerObject.router) {
    reducerObject.router = routerReducer;
  }
  if (!reducerObject.apollo) {
    reducerObject.apollo = apolloClient.reducer();
  }
  return preApplyReducer(combineReducers(reducerObject));
}

export function getMiddlewares(middleware) {
  if (Array.isArray(middleware)) {
    middleware.forEach(mid => {
      if (middlewares.indexOf(mid) === -1) {
        middlewares.push(mid);
      }
    });
  } else if (middleware) {
    middlewares.push(middleware);
  }

  return middlewares;
}

/**
 * Helper to create the store with all the things needed by Boldr
 * The store will look like this:
 * - root
 *  |- app (with appReducer)
 *  |- router
 *  |- apollo
 *  |- boldr (for the internals)
 *
 * @param  {Function}   appReducer        The reducer for your app.
 * @param  {Object}     preloadedState    Initial values for the state tree
 * @param  {Function}   apolloClient      The bootstrapped ApolloClient
 * @param  {String}     env               The build environment
 * @return {Object}                       The created store
 */
export default function createBoldrStore(appReducer, preloadedState, apolloClient, env) {
  const reducer = getReducer(appReducer, apolloClient);
  if (typeof enhancer === 'function') {
    enhancers.push(enhancer);
  }
  const middleware = [];
  const middles = getMiddlewares(middleware);
  const enhancers = [applyMiddleware(apolloClient.middleware(), ...middles)];

  if (env === 'development' && typeof window !== 'undefined') {
    if (window.devToolsExtension) {
      enhancers.push(window.devToolsExtension());
    }
  }
  const store = createStore(reducer, preloadedState, compose(...enhancers));
  return store;
}
