/* eslint-disable  import/max-dependencies, no-unused-vars */
/* @flow */
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
import Profile from '../../scenes/Profile';
import LoginContainer from '../../scenes/Account/Login';
import SignupContainer from '../../scenes/Account/Signup';
import AccountContainer from '../../scenes/Account';
import TagList from '../../scenes/Blog/TagList';
import Article from '../../scenes/Blog/Article';
import StatusRoute from '../../components/StatusRoute';
import Error404 from '../../pages/Error404';
import Home from '../../pages/Home';
import About from '../../pages/About';
import {
  articleRoute,
  tagRoute,
  aboutRoute,
  loginRoute,
  signupRoute,
  homeRoute,
  profileRoute,
  adminRoute,
} from '../../routePaths';
import { makeSelectIsAuthenticated } from '../../scenes/Account/state/selectors';
import DashboardLanding from '../../scenes/Admin/DashboardLanding';
// internal
// Start routes
import AdminDashboard from '../../scenes/Admin';
import type { RouterLocation } from '../../types/boldr';
import ProtectedRoute from '../ProtectedRoute';

type SwitcherProps = {
  children: Node,
  location: RouterLocation,
};

// $FlowIssue
const ContainerSwitcherRoute = ({ children, location, ...rest }: SwitcherProps) => {
  return location.pathname.includes('/admin') ? (
    <AdminDashboard>{children}</AdminDashboard>
  ) : (
    <div>{children}</div>
  );
};
const isAuthSelector = makeSelectIsAuthenticated();
const AdminRouterRoute = withRouter(
  // $FlowIssue
  connect(state => ({ isAuthenticated: isAuthSelector(state) }))(ProtectedRoute),
);
const ContainerSwitcher = withRouter(ContainerSwitcherRoute);

type Props = {
  location: RouterLocation,
};

const Root = ({ location }: Props) => (
  <div>
    <ContainerSwitcher>
      <Switch>
        <AdminRouterRoute exact path={adminRoute()} component={DashboardLanding} />
        <Route path={loginRoute()} component={LoginContainer} />
        <Route path={signupRoute()} component={SignupContainer} />
        <Route path="/account" component={AccountContainer} />
        <Route path={profileRoute(':username')} exact component={Profile} />

        <Route path={aboutRoute()} exact component={About} />
        <Route path={tagRoute(':name')} exact component={TagList} />
        <Route path={articleRoute(':slug')} exact component={Article} />
        <Route path={homeRoute()} exact component={Home} />
        <StatusRoute code={404}>
          <Route component={Error404} />
        </StatusRoute>
      </Switch>
    </ContainerSwitcher>
  </div>
);

export default Root;
