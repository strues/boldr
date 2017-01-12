import { loadRoute, errorLoading } from '../../core/utils';
import DashboardContainer from './Dashboard/DashboardContainer';

export default (store, connect) => {
  return {
    path: 'admin',
    component: DashboardContainer,
    indexRoute: {
      getComponent(nextState, cb) {
        System
          .import('./Dashboard/Dashboard')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
    childRoutes: [
      {
        path: 'posts',
        getComponent(nextState, cb) {
          System
            .import('./Post/PostList/PostListContainer')
            .then(loadRoute(cb))
            .catch(errorLoading);
        },
      },
      {
        path: 'posts/editor/:slug',
        getComponent(nextState, cb) {
          System
            .import('./Post/PostEditor')
            .then(loadRoute(cb))
            .catch(errorLoading);
        },
      },
      {
        path: 'posts/new',
        getComponent(nextState, cb) {
          System
            .import('./Post/NewPost/NewPostContainer')
            .then(loadRoute(cb))
            .catch(errorLoading);
        },
      },
      {
        path: 'filemanager',
        getComponent(nextState, cb) {
          System
            .import('./FileManager')
            .then(loadRoute(cb))
            .catch(errorLoading);
        },
      },
      {
        path: 'filemanager/:id/editor',
        getComponent(nextState, cb) {
          System
            .import('./FileManager/FileEditor')
            .then(loadRoute(cb))
            .catch(errorLoading);
        },
      },
      {
        path: 'navigation',
        getComponent(nextState, cb) {
          System.import('./Navigation').then(loadRoute(cb)).catch(errorLoading);
        },
      },
      {
        path: 'members',
        getComponent(nextState, cb) {
          System.import('./Members').then(loadRoute(cb)).catch(errorLoading);
        },
      },
      {
        path: 'templates',
        getComponent(nextState, cb) {
          System.import('./Templates').then(loadRoute(cb)).catch(errorLoading);
        },
      },
      {
        path: 'tags',
        getComponent(nextState, cb) {
          System.import('./Tags').then(loadRoute(cb)).catch(errorLoading);
        },
      },
    ],
  };
};
