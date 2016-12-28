import App from '../components/App';
import About from '../pages/About';
import Error404 from '../pages/Error404';
import Account from './Account';
import Blog from './Blog';
import Admin from './Admin';

export default function createRoutes(store) {
  const root = {
    path: '/',
    component: App,
    indexRoute: {
      component: require('../pages/Home').default,
    },
    childRoutes: [
      Account(store),
      Blog(store),
      Admin(store),
      About,
      Error404,
    ],
  };
  return root;
}
