import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import LOGIN_USER_MUTATION from '../gql/login.mutation.graphql';
import { doLogin, loginUserError } from '../state/actions';
import Login from './Login';

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
        if (!res.data.loginUser.token) {
          return console.error(res.data.loginUser.errors);
        }
        return dispatch(doLogin(res.data.loginUser));
      })
      .catch(err => {
        loginUserError(err);
      });
  },
});

export default withMutation(connect(null, mapDispatchToProps)(Login));
