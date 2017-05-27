/* @flow */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import FormCard from '~components/Form/FormCard';
import BaseTemplate from '../../../templates/BaseTemplate';
import { forgotPassword } from '~state/modules/users/actions';
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
      <BaseTemplate helmetMeta={<Helmet title="Forgot Password" />}>
        <div className="boldr-form__forgot">
          <FormCard
            title="Forgot Password"
            skinny
            lightText
            form={<ForgotPasswordForm onSubmit={this.handleSubmit} />}
          />
        </div>
      </BaseTemplate>
    );
  }
}

export default connect()(ForgotPassword);
