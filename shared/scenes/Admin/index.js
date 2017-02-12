import { loadRoute, errorLoading, injectAsyncReducer, getAsyncInjectors } from '../../core/utils';
import { requireAuth } from '../../core/services/token';
import DashboardLayout from './Dashboard/DashboardLayout';
import DashboardContainer from './Dashboard/DashboardContainer';

export default (store) => {
  const { injectReducer } = getAsyncInjectors(store);
  /* istanbul ignore next */
  return {
    path: 'admin',
    component: DashboardLayout,
    onEnter: requireAuth,
    indexRoute: {
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('./Dashboard/reducer'),
          import('./Dashboard/DashboardContainer'),
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
      {
        path: 'posts',
        getComponent(nextState, cb) {
          import('./Post/PostList/PostListContainer')
            .then(loadRoute(cb))
            .catch(errorLoading);
        },
      },
      {
        path: 'posts/editor/:slug',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            import('./FileManager/reducer'),
            import('./Post/PostEditor'),
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
        path: 'posts/new',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            import('./FileManager/reducer'),
            import('./Post/NewPost/NewPostContainer'),
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
        path: 'filemanager',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            import('./FileManager/reducer'),
            import('./FileManager'),
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
        path: 'filemanager/:id/editor',
        getComponent(nextState, cb) {
          import('./FileManager/FileEditor')
            .then(loadRoute(cb))
            .catch(errorLoading);
        },
      },
      {
        path: 'members',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            import('./Members/reducer'),
            import('./Members'),
          ]);

          const renderRoute = loadRoute(cb);

          importModules.then(([reducer, component]) => {
            injectReducer('members', reducer.default);

            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      },
      {
        path: 'navigation',
        getComponent(nextState, cb) {
          import('./Navigation').then(loadRoute(cb)).catch(errorLoading);
        },
      },
      {
        path: 'settings',
        getComponent(nextState, cb) {
          import('./Settings').then(loadRoute(cb)).catch(errorLoading);
        },
      },
      {
        path: 'templates',
        getComponent(nextState, cb) {
          import('./Templates').then(loadRoute(cb)).catch(errorLoading);
        },
      },
      {
        path: 'tags',
        getComponent(nextState, cb) {
          import('./Tags/TagsContainer').then(loadRoute(cb)).catch(errorLoading);
        },
      },
      {
        path: 'tags/:name',
        getComponent(nextState, cb) {
          import('./Tags/components/TaggedPost').then(loadRoute(cb)).catch(errorLoading);
        },
      },
    ],
  };
};
