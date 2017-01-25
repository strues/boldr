// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { doSignup } from '../../../state/modules/account/actions';
import Signup from './Signup';

type Props = {
  doSignup: () => void,
  handleOnSubmit: () => void,
  dispatch: () => void,
};

class SignupContainer extends PureComponent {
  constructor(props) {
    super(props);
    (this: any).handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  props: Props;

  handleOnSubmit(values: Object) {
    this.props.dispatch(doSignup({
      email: values.email,
      password: values.password,
      first_name: values.first_name,
      last_name: values.last_name,
      display_name: values.display_name,
    }));
  }

  render() {
    return (
      <div>
        <Helmet title="Signup" />
        <Signup handleOnSubmit={ this.handleOnSubmit } />
      </div>
    );
  }
}

export default connect()(SignupContainer);
