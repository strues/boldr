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
class App extends Component {
  static defaultProps = {
    className: 'app',
  };
  state = {
    theme: BASE_CONF,
  };

  props: Props;
  render() {
    const { className } = this.props;
    const classes = classnames('boldr', BASE_ELEMENT, className);
    return (
      <div>
        <Switch>
          <ProtectedRoute path="/admin" component={AdminDashboard} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/signup" component={SignupContainer} />
          <Route path="/account/forgot-password" component={ForgotPassword} />
          <Route path="/account/reset-password/:token" exact component={ResetPassword} />
          <Route path="/account/verify/:token" exact component={Verify} />
          <Route path="/account/preferences" component={PreferencesContainer} />
          <Route path="/profiles/:username" component={ProfileContainer} />
          <Route path="/blog" component={BlogContainer} />
          <Route path="/" exact component={Home} />
          <Route component={Error404} />
        </Switch>
        <Notifications />
      </div>
    );
  }
}
