// @flow
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
// internal
import SIGNUP_USER_MUTATION from '../gql/signup.mutation.graphql';
import { doSignup, signupUserError } from '../state/actions';
import Signup from './Signup';

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
        if (res.data.signupUser.errors !== null) {
          return dispatch(signupUserError(res.data.signupUser.errors));
        }
        return dispatch(doSignup(res.data.signupUser));
      })
      .catch(err => {
        signupUserError(err);
      });
  },
});

export default withMutation(connect(null, mapDispatchToProps)(Signup));
