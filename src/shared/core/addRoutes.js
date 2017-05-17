import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Redirect from 'react-router-dom/Redirect';
import uuid from 'uuid';
import PropTypes from 'prop-types';

const checkAuth = (store, route, props) => {
  if (!route.auth) {
    return <route.component {...props} route={route} />;
  }

  const { isAuthenticated } = store.getState().auth;
  const { required, redirect, status } = route.auth;

  const isRedirect =
    (required && !isAuthenticated) || (!required && isAuthenticated);

  if (isRedirect) {
    if (props.staticContext) {
      props.staticContext.status = status;
    }

    return <Redirect from={route.path} to={redirect} status={status} />;
  }

  return <route.component {...props} route={route} />;
};

checkAuth.propTypes = {
  staticContext: PropTypes.object,
};

checkAuth.defaultProps = {
  staticContext: null,
};

const RouteManager = (props, context) => (
  <Switch>
    {props.routes.map(route => (
      <Route
        key={uuid.v4()}
        path={route.path}
        render={props => checkAuth(context.store, route, props)}
        exact={route.exact}
        strict={route.strict}
      />
    ))}
  </Switch>
);

RouteManager.propTypes = {
  routes: PropTypes.array.isRequired,
};

RouteManager.contextTypes = {
  store: PropTypes.object,
};

export default routes => {
  if (!routes) {
    return null;
  }

  return <RouteManager routes={routes} />;
};
