/* @flow */
import '../../styles/main.scss';
import React, { Component } from 'react';
import classnames from 'classnames';
import Helmet from 'react-helmet';

import { StyleClasses } from 'boldr-ui';
import Notifications from '../../components/Notification';
import renderRoutes from '../../core/addRoutes';

const BASE_ELEMENT = StyleClasses.APP;

type Props = {
  route: Object,
  className: string,
};

class App extends Component {
  static displayName = 'App';
  props: Props;
  render() {
    const { className, route } = this.props;
    const classes = classnames('boldr', BASE_ELEMENT, className);
    return (
      <div className={classes}>
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
          <meta
            name="msapplication-TileImage"
            content="/favicons/mstile-144x144.png"
          />
          <link rel="manifest" href="/manifest.json" />
        </Helmet>
        {renderRoutes(route.routes)}
        <Notifications />
      </div>
    );
  }
}
export default App;
