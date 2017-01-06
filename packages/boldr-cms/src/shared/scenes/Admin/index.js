import { getAsyncInjectors } from '../../core/utils';
import DashboardContainer from './Dashboard/DashboardContainer';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default (store, connect) => {
  const { injectReducer } = getAsyncInjectors(store);
  return {
    path: 'admin',
    component: DashboardContainer,
    indexRoute: {
      getComponent(nextState, cb) {
        System.import('./Dashboard/Dashboard')
        .then(loadModule(cb))
        .catch(errorLoading);
      },
    },
    childRoutes: [
      {
        path: 'posts',
        getComponent(nextState, cb) {
          System.import('./Post/PostList/PostListContainer')
          .then(loadModule(cb))
          .catch(errorLoading);
        },
      },
      {
        path: 'posts/editor/:slug',
        getComponent(nextState, cb) {
          System.import('./Post/PostEditor')
          .then(loadModule(cb))
          .catch(errorLoading);
        },
      },
      {
        path: 'posts/new',
        getComponent(nextState, cb) {
          System.import('./Post/NewPost/NewPostContainer')
          .then(loadModule(cb))
          .catch(errorLoading);
        },
      },
      {
        path: 'filemanager',
        getComponent(nextState, cb) {
          System.import('./FileManager')
          .then(loadModule(cb))
          .catch(errorLoading);
        },
      },

      {
        path: 'navigation',
        getComponent(nextState, cb) {
          System.import('./Navigation')
          .then(loadModule(cb))
          .catch(errorLoading);
        },
      },
      {
        path: 'members',
        getComponent(nextState, cb) {
          System.import('./Members')
          .then(loadModule(cb))
          .catch(errorLoading);
        },
      }],
  };
};
