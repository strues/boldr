/* @flow */
import '../../styles/main.scss';
import React, { Component } from 'react';
import classnames from 'classnames';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { StyleClasses } from 'boldr-ui';

import { fetchSettingsIfNeeded } from '../../state/modules/boldr/settings';
import Notifications from '../../components/Notification';
import renderRoutes from '../../core/addRoutes';

const BASE_ELEMENT = StyleClasses.APP;

type Props = {
  route: Object,
  className: string,
  dispatch: () => void,
};
@connect()
class App extends Component {
  static displayName = 'App';
  componentDidMount() {
    this.props.dispatch(fetchSettingsIfNeeded());
  }
  props: Props;
  render() {
    const { className, route } = this.props;
    const classes = classnames('boldr', BASE_ELEMENT, className);
    return (
      <div>
        <Helmet>
          <html lang="en" />
          <title>Boldr</title>
          <meta name="application-name" content="Boldr" />
          <meta name="description" content="A modern, bold take on a cms" />
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="msapplication-TileColor" content="#2b2b2b" />
          <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png" />
          <meta name="theme-color" content="#2b2b2b" />
          <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/favicons/apple-touch-icon-152x152.png" />
          <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/favicons/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/favicons/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/favicons/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/favicons/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/favicons/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/favicons/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/favicons/apple-touch-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon-180x180.png" />
          <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#00a9d9" />
          <link rel="icon" type="image/png" href="/favicons/favicon-196x196.png" sizes="196x196" />
          <link rel="icon" type="image/png" href="/favicons/favicon-128.png" sizes="128x128" />
          <link rel="icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" sizes="16x16 32x32" href="/favicon.ico" />
          <meta name="msapplication-TileColor" content="#2b2b2b" />
          <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png" />
          <meta name="msapplication-square70x70logo" content="/favicons/mstile-70x70.png" />
          <meta name="msapplication-square150x150logo" content="/favicons/mstile-150x150.png" />
          <meta name="msapplication-wide310x150logo" content="/favicons/mstile-310x150.png" />
          <meta name="msapplication-square310x310logo" content="/favicons/mstile-310x310.png" />
          <link rel="manifest" href="/manifest.json" />
        </Helmet>
        <div className={ classes }>
          {renderRoutes(route.routes)}
          <Notifications />
        </div>
      </div>
    );
  }
}

export default App;
