/* @flow */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { doLogin } from '../../../state/modules/account/actions';
import Login from './Login';

type Props = {
  auth: Object,
  doLogin: () => void,
  redirect: String,
  dispatch: () => void,
  handleOnSubmit: () => void,
};

class LoginContainer extends PureComponent {
  constructor(props) {
    super(props);
    (this: any).handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  props: Props;

  handleOnSubmit(values) {
    const { dispatch } = this.props;
    const loginData = { email: values.email, password: values.password };
    const redir = this.props.redirect;
    dispatch(doLogin(loginData));
  }

  render() {
    return (
      <div>
        <Helmet title="Login" />
          <Login handleOnSubmit={ this.handleOnSubmit } />
      </div>
    );
  }
}

export default connect()(LoginContainer);
