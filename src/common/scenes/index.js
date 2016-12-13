import App from 'components/App';
import Account from './Account';
import Blog from './Blog';
import Dashboard from './Dashboard';
import About from './About';
import Error404 from './Error404';

export default function createRoutes(store) {
  const root = {
    path: '/',
    component: App,
    indexRoute: {
      component: require('./Home').default,
    },
    childRoutes: [
      Account(store),
      Blog(store),
      Dashboard(store),
      About,
      Error404,
    ],
  };
  return root;
}
