import { getAsyncInjectors, loadRoute, errorLoading } from '../../core/utils';
import DashboardContainer from './Dashboard/DashboardContainer';

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
        const renderRoute = loadRoute(cb);
        importModules.then(([reducer, component]) => {
          injectReducer('dashboard', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    childRoutes: [
      // Post(store),
      // {
      //   path: 'blocks',
      //   getComponent(nextState, cb) {
      //     const importModules = Promise.all([
      //       System.import('./Blocks/reducer'),
      //       System.import('./Blocks'),
      //     ]);
      //     const renderRoute = loadRoute(cb);
      //     importModules.then(([reducer, component]) => {
      //       injectReducer('blocks', reducer.default);
      //       renderRoute(component);
      //     });
      //
      //     importModules.catch(errorLoading);
      //   },
      // },
      // {
      //   path: 'blocks/build/:id',
      //   getComponent(nextState, cb) {
      //     const importModules = Promise.all([
      //       System.import('./Blocks/BuildBlock/reducer'),
      //       System.import('./Blocks/BuildBlock'),
      //     ]);
      //     const renderRoute = loadRoute(cb);
      //     importModules.then(([reducer, component]) => {
      //       injectReducer('build', reducer.default);
      //       renderRoute(component);
      //     });
      //
      //     importModules.catch(errorLoading);
      //   },
      // },
      {
        path: 'posts',
        getComponent(nextState, cb) {
          System.import('./Post/PostList/PostListContainer')
          .then(loadRoute(cb))
          .catch(errorLoading);
        },
      },
      {
        path: 'posts/editor/:slug',
        getComponent(nextState, cb) {
          System.import('./Post/PostEditor')
          .then(loadRoute(cb))
          .catch(errorLoading);
        },
      },
      {
        path: 'posts/new',
        getComponent(nextState, cb) {
          System.import('./Post/NewPost/NewPostContainer')
          .then(loadRoute(cb))
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
          const renderRoute = loadRoute(cb);
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
        .then(loadRoute(cb))
        .catch(errorLoading);
        },
      },
      {
        path: 'pages',
        getComponent(nextState, cb) {
          System.import('./Pages')
        .then(loadRoute(cb))
        .catch(errorLoading);
        },
      },
      {
        path: 'pages/new',
        getComponent(nextState, cb) {
          System.import('./Pages/components/NewPage')
        .then(loadRoute(cb))
        .catch(errorLoading);
        },
      },
      {
        path: 'pages/builder',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import('./Pages/PageBuilder/reducer'),
            System.import('./Pages/PageBuilder'),
          ]);
          const renderRoute = loadRoute(cb);
          importModules.then(([reducer, component]) => {
            injectReducer('pageBuilder', reducer.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      },
      {
        path: 'pages/builder/:label',
        getComponent(nextState, cb) {
          System.import('./Pages/PageBuilder')
        .then(loadRoute(cb))
        .catch(errorLoading);
        },
      },
      {
        path: 'settings',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./Settings').default);
          });
        },
      },
      {
        path: 'members',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import('./Members/reducer'),
            System.import('./Members'),
          ]);
          const renderRoute = loadRoute(cb);
          importModules.then(([reducer, component]) => {
            injectReducer('members', reducer.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      }],
  };
};
