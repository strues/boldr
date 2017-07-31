/* @flow */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import FormCard from '@boldr/ui/Form/FormCard';
import { forgotPassword } from '../state/actions';
import ForgotPasswordForm from './ForgotPasswordForm';

type Props = {
  dispatch: Function,
};

class ForgotPassword extends PureComponent {
  props: Props;

  handleSubmit = values => {
    const { email } = values;
    this.props.dispatch(forgotPassword(email));
  };
  render() {
    return (
      <div>
        <Helmet title="Forgot Password" />
        <div className="forgotpw-wrapper">
          <FormCard
            title="Forgot Password"
            skinny
            lightText
            form={<ForgotPasswordForm onSubmit={this.handleSubmit} />}
          />
        </div>
      </div>
    );
  }
}

export default connect()(ForgotPassword);
