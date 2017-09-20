/* eslint-disable no-unused-vars */
/* @flow */
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Route from 'react-router-dom/Route';
import withRouter from 'react-router-dom/withRouter';
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
const ContainerSwitcherRoute = ({ children, location, ...rest }: SwitcherProps) => {
  return location.pathname.includes('/admin') ? (
    <AdminDashboard>{children}</AdminDashboard>
  ) : (
    <div>{children}</div>
  );
};
const isAuthSelector = makeSelectIsAuthenticated();
const AdminRoute = withRouter(
  connect(state => ({ isAuthenticated: isAuthSelector(state) }))(ProtectedRoute),
);
const ContainerSwitcher = withRouter(ContainerSwitcherRoute);
const NotificationContainer = boldrNotificationsFactory(Notif);

type Props = {};
function App(props: Props) {
  return (
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
        <AdminRoute exact path="/admin" component={AdminLanding} />
        <Route path="/" component={Page} />
      </ContainerSwitcher>
      <NotificationContainer />
    </div>
  );
}

export default App;
