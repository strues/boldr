// @flow
import * as React from 'react';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';
import { connect } from 'react-redux';
import { getToken } from '@boldr/core';

export const hasAccessToken = () => {
  const token = getToken();
  return token;
};

export type Props = {
  component: React.Node,
  authInfo: Object,
  location: Object,
};

const ProtectedRoute = ({ component: ComposedComponent, ...rest }: Props) => {
  class Authentication extends React.Component {
    handleRender = props => {
      if (!this.props.authInfo) {
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
                message: 'You need to sign in',
              },
            }}
          />
        );
      } else {
        return <ComposedComponent {...props} />;
      }
    };

    render() {
      return <Route {...rest} render={this.handleRender} />;
    }
  }

  function mapStateToProps(state) {
    return { authInfo: state.auth.info };
  }

  const AuthenticationContainer = connect(mapStateToProps)(Authentication);
  return <AuthenticationContainer />;
};
export default ProtectedRoute;
