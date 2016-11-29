import App from 'components/App';
import Account from './Site/Account';
import Blog from './Site/Blog';
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
          System.import('./Site/About')
            .then(loadModule(cb))
            .catch(errorLoading);
        },
      },
      {
        path: '*',
        getComponent(location, cb) {
          System.import('./Site/Error404')
            .then(loadModule(cb))
            .catch(errorLoading);
        },
      },
    ],
    indexRoute: {
      component: require('./Site/Home').default,
    },
  };
  return root;
}
