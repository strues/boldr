import App from 'components/App';
import Account from './Account';
import Blog from './Blog';
import Dashboard from './Dashboard';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  const root = {
    path: '/',
    component: App,
    childRoutes: [
      Account(store),
      Blog(store),
      Dashboard(store),
      {
        path: 'about',
        getComponent(nextState, cb) {
          System.import('./About')
            .then(loadModule(cb))
            .catch(errorLoading);
        },
      },
      {
        path: '*',
        getComponent(location, cb) {
          System.import('./Error404')
            .then(loadModule(cb))
            .catch(errorLoading);
        },
      },
    ],
    indexRoute: {
      component: require('./Home').default,
    },
  };
  return root;
}
