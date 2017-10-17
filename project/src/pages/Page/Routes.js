import React from 'react';

import { Route, Switch } from 'react-router-dom';
import Profile from '../../scenes/Profile';
import LoginContainer from '../../scenes/Account/Login';
import SignupContainer from '../../scenes/Account/Signup';
import AccountContainer from '../../scenes/Account';
import TagList from '../../scenes/Blog/TagList';
import Article from '../../scenes/Blog/Article';
import StatusRoute from '../../components/StatusRoute';
import Error404 from '../Error404';
import Home from '../Home';
import About from '../About';
import { articleRoute } from '../../routePaths';

const Routes = () => (
  <Switch>
    <Route path="/login" component={LoginContainer} />
    <Route path="/signup" component={SignupContainer} />
    <Route path="/account" component={AccountContainer} />
    <Route path="/profiles/:username" exact component={Profile} />

    <Route path="/about" exact component={About} />
    <Route path="/blog/tags/:name" exact component={TagList} />
    <Route path={articleRoute(':slug')} exact component={Article} />
    <Route path="/" exact component={Home} />
    <StatusRoute code={404}>
      <Route component={Error404} />
    </StatusRoute>
  </Switch>
);

export default Routes;
