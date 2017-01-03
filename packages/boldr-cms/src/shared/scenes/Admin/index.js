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
        const importModules = Promise.all([
          System.import('./Dashboard/reducer'),
          System.import('./Dashboard/Dashboard'),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([reducer, component]) => {
          injectReducer('dashboard', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
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
          const importModules = Promise.all([
            System.import('./FileManager/reducer'),
            System.import('./FileManager'),
          ]);
          const renderRoute = loadModule(cb);
          importModules.then(([reducer, component]) => {
            injectReducer('attachments', reducer.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
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
          const importModules = Promise.all([
            System.import('./Members/reducer'),
            System.import('./Members'),
          ]);
          const renderRoute = loadModule(cb);
          importModules.then(([reducer, component]) => {
            injectReducer('members', reducer.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      }],
  };
};
