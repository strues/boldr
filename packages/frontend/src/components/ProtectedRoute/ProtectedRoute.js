// @flow
import React from 'react';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';
import { getToken } from '@boldr/core';
import type { RouterLocation } from '../../types/boldr';

export const hasAccessToken = () => {
  const token = getToken();
  return token;
};

export type Props = {
  component: Object,
  isAuthenticated: boolean,
  location: RouterLocation,
};

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }: Props) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )}
  />
);

export default ProtectedRoute;
