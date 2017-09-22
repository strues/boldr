/**
 * @module @boldr/core/shared/state/createBoldrStore
 */
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import invariant from 'invariant';
import boldrReducer from './boldr/reducer';

const preReducers = [];

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        actionsBlacklist: [
          '@@redux-form/CHANGE',
          '@@redux-form/BLUR',
          '@@redux-form/FOCUS',
          '@@redux-form/UNREGISTER_FIELD',
          '@@redux-form/REGISTER_FIELD',
        ],
      })
    : compose;
/**
 * Placeholder for a non active middleware in Redux.
 *
 * @param store {Object} Store object to work with.
 */
export function emptyMiddleware(store) {
  return next => {
    return action => {
      return next(action);
    };
  };
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
 * @param  {Function|Object}  appReducer    user's app reducer
 * @param {Function}          apolloClient  the apolloClient instance
 * @return {Function}                       the reducer
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
    invariant(false, 'Must provde an appReducer');
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
export default function createBoldrStore(history, appReducer, preloadedState, apolloClient) {
  const reducer = getReducer(appReducer, apolloClient);

  const middleware = [
    thunk,
    apolloClient.middleware(),
    routerMiddleware(history),
    // Redux middleware that spits an error on you when you try to mutate
    // your state either inside a dispatch or between dispatches.
    // https://github.com/leoasis/redux-immutable-state-invariant
    process.env.NODE_ENV === 'development'
      ? require('redux-immutable-state-invariant').default()
      : emptyMiddleware,
  ];

  if (process.env.NODE_ENV === 'development' && process.env.TARGET === 'web') {
    middleware.push(require('redux-logger').createLogger({ collapsed: true }));
  }

  // const middles = getMiddlewares(middleware);

  const enhancers = [applyMiddleware(...middleware)];

  if (typeof enhancer === 'function') {
    enhancers.push(enhancer);
  }

  const store = createStore(reducer, preloadedState, composeEnhancers(...enhancers));
  return store;
}
