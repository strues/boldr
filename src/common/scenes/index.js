import App from 'components/App';
import Account from './front/Account';
import Blog from './front/Blog';
import Dashboard from './dashboard';

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
          System.import('./front/About')
            .then(loadModule(cb))
            .catch(errorLoading);
        },
      },
      {
        path: '*',
        getComponent(location, cb) {
          System.import('./front/Error404')
            .then(loadModule(cb))
            .catch(errorLoading);
        },
      },
    ],
    indexRoute: {
      component: require('./front/Home').default,
    },
  };
  return root;
}
