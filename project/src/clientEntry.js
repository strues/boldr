/* eslint-disable prefer-destructuring, no-underscore-dangle, new-cap */
import React from 'react';

import { polyfill as rafPolyfill } from 'raf';
import { render, getToken, createApolloClient, createBoldrStore, createHistory } from '@boldr/core';

import { checkAuth } from './scenes/Account/state/actions';
import App from './components/App';

import appReducer from './reducers';

const DOM_NODE = document.getElementById('app');
const preloadedState = window.__APOLLO_STATE__;

const token = getToken();
rafPolyfill();
/**
 * createApolloClient configures an instance of ApolloClient for use in the app.
 * It accepts a config object.
 * The values are documented below...
 *
 * type config = {
 *    headers: Object,
 *    initialState: Object,
 *    batchRequests: boolean, // false
 *    trustNetwork: boolean, // true
 *    queryDeduplication: boolean, // true
 *    uri: string
 *    connectToDevTools: boolean // true
 *    ssrForceFetchDelay: number // 100
 * }
 */
const apolloClient = createApolloClient({
  batchRequests: true,
  initialState: preloadedState,
  uri: process.env.GRAPHQL_ENDPOINT,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const history = createHistory();

// Create the redux store by passing the "main" reducer, preloadedState, the Apollo Client
// and env. Passing either 'development' or 'production' (env) includes/excludes
// reduxDevTools, etc
const reduxStore = createBoldrStore(history, appReducer, preloadedState, apolloClient);

if (token) {
  // Update application state. User has token and is probably authenticated
  reduxStore.dispatch(checkAuth(token));
}

/**
 * Renders the given React Application component.
 * @param {Function} apolloClient     The apolloClient created w/ createApolloClient
 * @param {Function} reduxStore       The create redux store function
 * @param {Object}   history          The history object
 */

render({ apolloClient, reduxStore, history }, <App />, DOM_NODE);
