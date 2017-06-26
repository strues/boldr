/* @flow */
import React from 'react';
import classnames from 'classnames';
import Helmet from 'react-helmet';
import { graphql, gql } from 'react-apollo';
import { Route, Switch, Redirect } from 'react-router-dom';
import universal from 'react-universal-component';
// internal
import '../styles/main.scss';
import { StyleClasses } from '../theme/styleClasses';
import Notifications from '../components/Notification';
// Start routes
import Page from '../pages/Page';
import Error404 from '../pages/Error404';
import SiteHeaderContainer from '../components/SiteHeader/SiteHeaderContainer';
import { getToken } from './authentication/token';

const BASE_ELEMENT = StyleClasses.APP;

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

type Props = {
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

class App extends React.Component {
  static defaultProps = {
    className: 'app',
  };

  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  props: Props;
  render() {
    const { className } = this.props;
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
          <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png" />
          {__DEV__ ? null : <link rel="manifest" href="/manifest.json" />}
        </Helmet>
        <SiteHeaderContainer
          menu={this.props.data.getMenuById}
          settings={this.props.data.getSettings}
        />
        <Switch>
          <ProtectedRoute path="/admin" component={AdminDashboard} />
          <Route path="/" component={Page} />
          <Route component={Error404} />
        </Switch>
        <Notifications />
      </div>
    );
  }
}

export const SETTINGS_QUERY = gql`
  query getSettings {
    getSettings {
      id,
      key,
      value,
      label,
      description,
    }
  }
`;
export default graphql(SETTINGS_QUERY)(App);
