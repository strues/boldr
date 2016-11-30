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
<<<<<<< HEAD:src/common/scenes/index.js
    component: BoldrWrapper,
    indexRoute: {
      component: require('./Home').default,
    },
=======
    component: App,
>>>>>>> develop:src/common/scenes/index.js
    childRoutes: [
      Account(store),
      Blog(store),
      Dashboard(store),
      {
        path: 'about',
        getComponent(nextState, cb) {
<<<<<<< HEAD:src/common/scenes/index.js
          System.import('./About')
=======
          System.import('./Site/About')
>>>>>>> develop:src/common/scenes/index.js
            .then(loadModule(cb))
            .catch(errorLoading);
        },
      },
      {
        path: '*',
        getComponent(location, cb) {
<<<<<<< HEAD:src/common/scenes/index.js
          System.import('./Error404')
=======
          System.import('./Site/Error404')
>>>>>>> develop:src/common/scenes/index.js
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
