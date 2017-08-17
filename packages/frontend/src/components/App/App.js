/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'react-apollo';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';
import Switch from 'react-router-dom/Switch';
import Loader from '@boldr/ui/Loader';
import { getToken } from '@boldr/auth';
// internal
import '../../styles/main.scss';
// Start routes
import Page from '../../pages/Page/Page';
import Error404 from '../../pages/Error404';
import AdminDashboard from '../../scenes/Admin';
import boldrNotificationsFactory, { Notif } from '../Notifications';

import SETTINGS_QUERY from './getSettings.graphql';

export const hasAccessToken = () => {
  const token = getToken();
  return token;
};

export type ProtectedProps = {
  component: ReactElement,
  location: Object,
};
// $FlowIssue
const ProtectedRoute = ({ component: Component, ...rest }: ProtectedProps) =>
  <Route
    {...rest}
    render={props =>
      hasAccessToken
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />}
  />;

export type Props = {
  data: Object,
};

const NotificationContainer = boldrNotificationsFactory(Notif);

const App = (props: Props) => {
  if (props.data.loading) {
    return <Loader />;
  }
  return (
    <div className="boldr">
      <Helmet
        titleTemplate="%s - Powered by Boldr"
        defaultTitle="Boldr: Modern Content Management Framework"
      >
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
      <Switch>
        <ProtectedRoute path="/admin" component={AdminDashboard} />
        <Route path="/" component={Page} />
        <Route component={Error404} />
      </Switch>
      <NotificationContainer />
    </div>
  );
};
// $FlowIssue
export default graphql(SETTINGS_QUERY)(App);
