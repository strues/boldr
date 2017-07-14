/* @flow */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'react-apollo';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';
import Switch from 'react-router-dom/Switch';
import universal from 'react-universal-component';
// internal
import '../styles/main.scss';
import Loader from '@boldr/ui/Loader';

// Start routes
import Error404 from '../pages/Error404';
import Navbar from '../components/Navbar';
import boldrNotificationsFactory, { Notif } from '../components/Notifications';
import { getToken } from './authentication/token';
import SETTINGS_QUERY from './getSettings.graphql';

export const hasAccessToken = () => {
  const token = getToken();
  return !!token;
};

type ProtectedProps = {
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
  className: ?string,
  ui: Object,
  data: Object,
  location: Location,
};

type Location = {
  pathname: string,
  hash: ?string,
};

const AdminDashboard = universal(() => import('../scenes/Admin/AdminDashboard'), {
  resolve: () => require.resolveWeak('../scenes/Admin/AdminDashboard'),
});
const Page = universal(() => import('../pages/Page'), {
  resolve: () => require.resolveWeak('../pages/Page'),
});
const NotificationContainer = boldrNotificationsFactory(Notif);
class App extends Component {
  props: Props;
  render() {
    if (this.props.data.loading) {
      return <Loader />;
    }
    return (
      <div className="boldr">
        <Helmet>
          <html lang="en" />
          <title>Boldr</title>
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
          {__DEV__ ? null : <link rel="manifest" href="/manifest.json" />}
        </Helmet>
        <Switch>
          <ProtectedRoute path="/admin" component={AdminDashboard} />
          <Route path="/" component={Page} />
          <Route component={Error404} />
        </Switch>
        <NotificationContainer />
      </div>
    );
  }
}

export default graphql(SETTINGS_QUERY)(App);
