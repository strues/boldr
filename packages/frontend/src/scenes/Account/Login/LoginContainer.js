/* eslint-disable promise/always-return, consistent-return */
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import { sendNotification } from '@boldr/core';
import LOGIN_USER_MUTATION from '../gql/login.mutation.graphql';
import { doLogin, loginUserError } from '../state/actions';
import Login from './Login';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: formInput => {
    ownProps
      .loginAccount(formInput)
      .then(res => {
        if (res.data.loginAccount.errors !== null) {
          loginUserError(err);
          return dispatch(
            sendNotification({
              type: 'error',
              text: 'There was a problem with your login details',
            }),
          );
        }
        return dispatch(doLogin(res.data.loginAccount));
      })
      .catch(err => {
        loginUserError(err);
      });
  },
});

export default compose(
  graphql(LOGIN_USER_MUTATION, {
    props: ({ mutate }) => ({
      loginAccount: formInput =>
        mutate({
          variables: {
            input: {
              email: formInput.email,
              password: formInput.password,
            },
          },
        }),
    }),
  }),
  connect(null, mapDispatchToProps),
)(Login);
