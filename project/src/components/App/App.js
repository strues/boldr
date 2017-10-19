/* eslint-disable no-unused-vars, import/max-dependencies */
/* @flow */
import React from 'react';
import type { Element } from 'react';
import Helmet from 'react-helmet';
// internal
import '../../styles/main.scss';
// Start routes
import boldrNotificationsFactory, { Notif } from '../Notifications';
import Root from '../Root';

const NotificationContainer = boldrNotificationsFactory(Notif);

const App = () => (
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
    <Root />
    <NotificationContainer />
  </div>
);

export default App;
