/* eslint-disable dot-notation */
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { getToken } from '../core/authentication/token';
import rootReducer from './reducers';

const isBrowser = typeof window === 'object';
const token = isBrowser ? getToken() : null;
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

export default function configureStore(preloadedState, history) {
  const reduxRouterMiddleware = routerMiddleware(history);

  const middlewares = [thunk.withExtraArgument(axios), reduxRouterMiddleware];

  const enhancers = [
    applyMiddleware(...middlewares),
    __DEV__ && typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
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
