// @flow
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// internal
import { signupUserError, signupUserSuccess } from '../state/actions';
import Signup from './Signup';

export const SIGNUP_USER_MUTATION = gql`
  mutation signupUser($input: UserSignupInput!) {
    signupUser(input: $input) {
      username
        firstName
        lastName
        email
    }
  }
`;

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
        return dispatch(push('/'));
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
