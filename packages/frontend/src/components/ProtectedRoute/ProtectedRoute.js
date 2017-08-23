// @flow
import * as React from 'react';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';
import { getToken } from '@boldr/core';

export const hasAccessToken = () => {
  const token = getToken();
  return token;
};

export type Props = {
  component: Object,
  location: Object,
};
// $FlowIssue
const ProtectedRoute = ({ component: Component, ...rest }: Props) =>
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

export default ProtectedRoute;
