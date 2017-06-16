import store from './state/store';
import api from './api';
import App from './App';
import boldrConnect from './boldrConnect';
import ConnectedDispatcher from './Dispatcher';
import RegistryProvider from './RegistryProvider';
// import UIRouter from './UIRouter';
// import history from './history';
import actions from './state/actions/';
import reducers from './state/reducers/';
import getErrorMiddleware from './state/middlewares/error';
import componentState from './componentState';

import createApolloClient from './state/createApolloClient';

const Dispatcher = ConnectedDispatcher;

export {
  createApolloClient,
  store,
  actions,
  App,
  api,
  boldrConnect,
  Dispatcher,
  RegistryProvider,
  componentState,
  getErrorMiddleware,
  reducers,
};
