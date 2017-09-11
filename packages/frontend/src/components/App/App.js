/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

// internal
import '../../styles/main.scss';
// Start routes
import Page from '../../pages/Page/Page';
import Error404 from '../../pages/Error404';
import AdminDashboard from '../../scenes/Admin';
import boldrNotificationsFactory, { Notif } from '../Notifications';
import ProtectedRoute from '../ProtectedRoute';
import StatusRoute from '../StatusRoute';

const NotificationContainer = boldrNotificationsFactory(Notif);

const App = () => {
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
          href="https://fonts.googleapis.com/css?family=Chivo:300,700|Roboto:400,700"
          rel="stylesheet"
        />
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
        <StatusRoute code={404}>
          <Route component={Error404} />
        </StatusRoute>
      </Switch>
      <NotificationContainer />
    </div>
  );
};

export default App;
