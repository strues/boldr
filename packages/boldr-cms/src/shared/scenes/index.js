/* eslint-disable babel/new-cap */
import App from '../components/App';
import About from '../pages/About';
import Home from '../pages/Home';
import Error404 from '../pages/Error404';
import Profile from './Profile';
import Account from './Account';
import Blog from './Blog';
import Admin from './Admin';


function createChildRoutes(store) {
/* istanbul ignore next */
  return [
    {
      path: '/',
      component: Home,
    },
    Account(store),
    Blog(store),
    Admin(store),
    Profile(store),
    About,
    Error404,

  ];
}
export default function createRoutes(store) {
  /* istanbul ignore next */
  return {
    component: App,
    childRoutes: createChildRoutes(store),
  };
}
