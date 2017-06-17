/* @flow */
import React, { Component } from 'react';
import classnames from 'classnames';
import Helmet from 'react-helmet';
import { compose, graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';
import { selectMe } from './state/modules/users/selectors';
import { injectGlobal, ThemeProvider } from 'styled-components';
import { StyleClasses } from 'boldr-ui';
import { Route, Switch, Redirect } from 'react-router-dom';
import AnimatedRouter from './components/AnimatedRouter';
import Notifications from './components/Notification';
import { getToken } from './core/authentication/token';
import { BASE_CONF } from './components/Layout';
// Start routes
import AdminDashboard from './scenes/Admin/AdminDashboard';
import Home from './pages/Home';
import About from './pages/About';
import Error404 from './pages/Error404';
// Account
import SignupContainer from './scenes/Account/Signup/SignupContainer';
import LoginContainer from './scenes/Account/Login';
import ForgotPassword from './scenes/Account/ForgotPassword';
import ResetPassword from './scenes/Account/ResetPassword';
import Verify from './scenes/Account/Verify';
import PreferencesContainer from './scenes/Account/Preferences';
// Profile
import ProfileContainer from './scenes/Profile/ProfileContainer';
// Blog
import BlogContainer from './scenes/Blog/BlogContainer';
import normalizeStyled from './theme/normalizeStyled';
import SiteHeaderContainer from './components/SiteHeader/SiteHeaderContainer';
import './styles/main.scss';
const BASE_ELEMENT = StyleClasses.APP;

injectGlobal`
  ${normalizeStyled}
`;

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
class App extends Component {
  static defaultProps = {
    className: 'app',
  };
  state = {
    theme: BASE_CONF,
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
      <ThemeProvider theme={{ layout: this.state.theme }}>
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
            <link rel="manifest" href="/manifest.json" />
          </Helmet>
          <SiteHeaderContainer settings={this.props.data.getSettings} />
          <AnimatedRouter.Switch>
            <ProtectedRoute path="/admin" component={AdminDashboard} />
            <AnimatedRouter.Route path="/login" component={LoginContainer} />
            <AnimatedRouter.Route path="/signup" component={SignupContainer} />
            <AnimatedRouter.Route path="/account/forgot-password" component={ForgotPassword} />
            <AnimatedRouter.Route
              path="/account/reset-password/:token"
              exact
              component={ResetPassword}
            />
            <AnimatedRouter.Route path="/account/verify/:token" exact component={Verify} />
            <AnimatedRouter.Route path="/account/preferences" component={PreferencesContainer} />
            <AnimatedRouter.Route path="/profiles/:username" component={ProfileContainer} />
            <AnimatedRouter.Route path="/blog" component={BlogContainer} />
            <AnimatedRouter.Route path="/about" exact component={About} />
            <AnimatedRouter.Route path="/" exact component={Home} />
            <AnimatedRouter.Route component={Error404} />
          </AnimatedRouter.Switch>
          <Notifications />
        </div>
      </ThemeProvider>
    );
  }
}

export const SETTINGS_QUERY = gql`
  query {
    getSettings {
      id,
      key,
      value,
      label,
      description,
    }
}
`;

const mapStateToProps = state => {
  return {
    router: state.router,
  };
};

export default compose(graphql(SETTINGS_QUERY), connect(mapStateToProps))(App);
