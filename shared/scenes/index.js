import App from '../components/App';
import About from '../pages/About';
import Home from '../pages/Home';
import Error404 from '../pages/Error404';
import Account from './Account';
import Blog from './Blog';
import Admin from './Admin';

export default function createRoutes(store) {
  /* istanbul ignore next */
  return [
    {
      path: '/',
      component: App,
      indexRoute: {
        component: Home,
      },
      childRoutes: [
        Account(store),
        Blog(store),
        Admin(store),
        About,
        Error404,
      ],
    },
  ];
}
