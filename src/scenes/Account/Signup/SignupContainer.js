// @flow

import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// internal
import { replacePath } from '../../../core/RouterConnection';
import { signupUserError, signupUserSuccess } from '../state/actions';
import Signup from './Signup';
import SIGNUP_USER_MUTATION from './signup.mutation.graphql';

const withMutation = graphql(SIGNUP_USER_MUTATION, {
  props: ({ mutate }) => ({
    signupUser: formInput =>
      mutate({
        variables: {
          input: {
            email: formInput.email,
            password: formInput.password,
            firstName: formInput.firstName,
            lastName: formInput.lastName,
            username: formInput.username,
          },
        },
      }),
  }),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: formInput => {
    ownProps
      .signupUser(formInput)
      .then(res => {
        if (res.data.signupUser.errors) {
          dispatch(
            sendNotification({
              message: res.data.signupUser.errors[0].value,
              kind: 'error',
              dismissAfter: 3000,
            }),
          );
          dispatch(
            signupUserError({
              error: res.data.signupUser.errors,
            }),
          );
        }
        dispatch(signupUserSuccess(res.data.signupUser));
        dispatch(
          sendNotification({
            message: 'Account created!',
            kind: 'success',
            dismissAfter: 3000,
          }),
        );
        return dispatch(replacePath('/'));
      })
      .catch(error => {
        dispatch(
          signupUserError({
            error,
          }),
        );
      });
  },
});

export default withMutation(connect(null, mapDispatchToProps)(Signup));
