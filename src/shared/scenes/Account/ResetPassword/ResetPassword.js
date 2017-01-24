/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormCard from '../../../components/Form/FormCard';
import { resetPassword } from '../../../state/modules/account/actions';
import ResetPasswordForm from './ResetPasswordForm';

type Props = {
  dispatch: () => void,
  params: Object
};

class ResetPassword extends Component {
  constructor(props: Props) {
    super(props);

    (this: any).handleReset = this.handleReset.bind(this);
  }
  props: Props;

  handleReset(values, props): void {
    this.props.dispatch(resetPassword(values.password, this.props.params.token));
  }

  render() {
    return (
      <div>
        <FormCard
          title="Reset Password"
          form={ <ResetPasswordForm onSubmit={ this.handleReset } /> }
        />
      </div>
    );
  }
}

export default connect()(ResetPassword);
