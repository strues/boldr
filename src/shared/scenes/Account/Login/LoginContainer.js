import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { sendNotification } from '~state/modules/notifications/notifications';
import { setToken } from '../../../core/authentication/token';
import { setUserLoggedIn } from '~state/modules/users/actions';
import { loginUserSuccess, loginUserError } from '../state/actions';
import Login from './Login';

export const LOGIN_USER_MUTATION = gql`
  mutation loginUser($input: UserLoginInput!) {
    loginUser(input: $input) {
      token,
      user {
        id
        username
        firstName
        lastName
        email
        roles {
          id
          name
        }
      },
      errors {
        key
        value
      }
    }
  }
`;

const withMutation = graphql(LOGIN_USER_MUTATION, {
  props: ({ mutate }) => ({
    loginUser: formInput =>
      mutate({
        variables: {
          input: {
            email: formInput.email,
            password: formInput.password,
          },
        },
      }),
  }),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: formInput => {
    ownProps
      .loginUser(formInput)
      .then(res => {
        const { token } = res.data.loginUser;
        if (!token) {
          dispatch(
            sendNotification({
              message: res.data.loginUser.errors[0].value,
              kind: 'error',
              dismissAfter: 3000,
            }),
          );
          dispatch(
            loginUserError({
              error: res.data.loginUser.errors,
            }),
          );
        }
        const { loginUser } = res.data;
        setToken(token);
        dispatch(loginUserSuccess(loginUser));
        dispatch(setUserLoggedIn(loginUser));
        dispatch(
          sendNotification({
            message: 'Welcome back!',
            kind: 'success',
            dismissAfter: 3000,
          }),
        );
        return dispatch(push('/'));
      })
      .catch(error => {
        dispatch(
          loginUserError({
            error,
          }),
        );
      });
  },
});

export default withMutation(connect(null, mapDispatchToProps)(Login));
