// @flow
import React from 'react';
import SignupContainer from './Signup/SignupContainer';
import LoginContainer from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Verify from './Verify';
import PreferencesContainer from './Preferences';

export default [
  {
    path: '/login',
    exact: true,
    component: LoginContainer,
    routes: [],
  },
  {
    path: '/signup',
    exact: true,
    component: SignupContainer,
    routes: [],
  },
  {
    path: '/account/verify/:token',
    exact: true,
    component: Verify,
    routes: [],
  },
  {
    path: '/account/reset-password/:token',
    exact: true,
    component: ResetPassword,
    routes: [],
  },
  {
    path: '/account/forgot-password',
    exact: true,
    component: ForgotPassword,
    routes: [],
  },
  {
    path: '/account/preferences',
    exact: true,
    component: PreferencesContainer,
    routes: [],
  },
];
