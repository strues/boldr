import React from 'react';
import Route from 'react-router-dom/Route';
import LoginContainer from './Login/LoginContainer';
import SignupContainer from './Signup/SignupContainer';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Verify from './Verify';
import PreferencesContainer from './Preferences';

import Scene from '../../core/sceneConnector';

export default new Scene({
  route: [
    <Route exact path="/account/login" component={LoginContainer} />,
    <Route exact path="/account/signup" component={SignupContainer} />,
    <Route exact path="/account/forgot-password" component={ForgotPassword} />,
    <Route
      exact
      path="/account/reset-password/:token"
      component={ResetPassword}
    />,
    <Route exact path="/account/verify/:token" component={Verify} />,
    <Route
      exact
      path="/account/preferences"
      component={PreferencesContainer}
    />,
  ],
});
