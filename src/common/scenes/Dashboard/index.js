import { getAsyncInjectors } from '../../core';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default (store, connect) => {
  const { injectReducer } = getAsyncInjectors(store);
  return {
    path: 'cp',
    component: require('./Dashboard').default,
    indexRoute: {
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./reducer'),
          System.import('./DashboardWidgets'),
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
        path: 'blocks',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import('./Blocks/reducer'),
            System.import('./Blocks'),
          ]);
          const renderRoute = loadModule(cb);
          importModules.then(([reducer, component]) => {
            injectReducer('blocks', reducer.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      },
      {
        path: 'blocks/build/:id',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import('./Blocks/BuildBlock/reducer'),
            System.import('./Blocks/BuildBlock'),
          ]);
          const renderRoute = loadModule(cb);
          importModules.then(([reducer, component]) => {
            injectReducer('build', reducer.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      },
      {
        path: 'posts',
        getComponent(nextState, cb) {
          System.import('./Post/PostList')
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
        path: 'pages',
        getComponent(nextState, cb) {
          System.import('./Pages')
        .then(loadModule(cb))
        .catch(errorLoading);
        },
      },
      {
        path: 'pages/builder',
        getComponent(nextState, cb) {
          System.import('./Pages/PageBuilder')
        .then(loadModule(cb))
        .catch(errorLoading);
        },
      },
      {
        path: 'pages/builder/:label',
        getComponent(nextState, cb) {
          System.import('./Pages/PageBuilder')
        .then(loadModule(cb))
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
