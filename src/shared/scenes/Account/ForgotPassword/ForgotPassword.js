import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormCard } from 'boldr-ui';

import BaseTemplate from '../../../templates/BaseTemplate';
import { forgotPassword } from '../../../state';
import ForgotPasswordForm from './ForgotPasswordForm';

export type Props = {
  dispatch?: Function,
};

class ForgotPassword extends PureComponent {
  props: Props;

  handleSubmit = values => {
    const { email } = values;
    this.props.dispatch(forgotPassword(email));
  };
  render() {
    return (
      <BaseTemplate helmetMeta={<Helmet title="Forgot Password" />}>
        <div className="boldr-form__forgot">
          <FormCard
            title="Forgot Password"
            form={<ForgotPasswordForm onSubmit={this.handleSubmit} />}
          />
        </div>
      </BaseTemplate>
    );
  }
}

export default connect()(ForgotPassword);
