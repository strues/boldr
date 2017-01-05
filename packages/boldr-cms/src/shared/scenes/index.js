import App from '../components/App';
import About from '../pages/About';
import Home from '../pages/Home';
import Error404 from '../pages/Error404';
import Account from './Account';
import Blog from './Blog';
import Admin from './Admin';

export default function createRoutes(store) {
  const root = {
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
  };
  return root;
}

/*
function createChildRoutes(store) {
  return [
    Account(store),
    Blog(store),
    Admin(store),
    Home,
    About,
    Error404,
  ];
}

export default function createRootRoute(store) {
  return {
    component: App,
    childRoutes: createChildRoutes(store),
  };
}

*/
