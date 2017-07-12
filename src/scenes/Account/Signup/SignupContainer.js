// @flow

import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// internal
import { replacePath } from '../../../core/RouterConnection';
import { showNotification } from '../../../state/notifications/notifications';
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
            showNotification({
              text: res.data.signupUser.errors[0].value,
              type: 'error',
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
          showNotification({
            text: 'Account created!',
            type: 'success',
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
