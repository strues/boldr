/* eslint-disable no-unused-vars, import/max-dependencies */
/* @flow */
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
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
import AdminLanding from '../../scenes/Admin/DashboardLanding';
// internal
import '../../styles/main.scss';
// Start routes
import Page from '../../pages/Page/Page';
import AdminDashboard from '../../scenes/Admin';
import type { RouterLocation } from '../../types/boldr';
import boldrNotificationsFactory, { Notif } from '../Notifications';
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
const AdminRoute = withRouter(
  // $FlowIssue
  connect(state => ({ isAuthenticated: isAuthSelector(state) }))(ProtectedRoute),
);
const ContainerSwitcher = withRouter(ContainerSwitcherRoute);
const NotificationContainer = boldrNotificationsFactory(Notif);

type Props = {
  location: RouterLocation,
};
const App = ({ location }: Props) => (
  <div className="boldr">
    <Helmet
      titleTemplate="%s - Powered by Boldr"
      defaultTitle="Boldr: Modern Content Management Framework">
      <html lang="en" />
      <meta name="application-name" content="Boldr" />
      <meta name="description" content="A modern, bold take on a cms" />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#2b2b2b" />
      <link rel="icon" sizes="16x16 32x32" href="/favicons/favicon.ico" />

      <link
        rel="apple-touch-icon-precomposed"
        sizes="144x144"
        href="/favicons/apple-touch-icon-144x144.png"
      />
      <meta name="msapplication-TileColor" content="#2b2b2b" />
      <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png" />
    </Helmet>
    <ContainerSwitcher>
      <Switch>
        <AdminRoute exact path={adminRoute()} component={AdminLanding} />
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
    <NotificationContainer />
  </div>
);

export default App;
