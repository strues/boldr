import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import FormCard from '../../../components/Form/FormCard';
import { forgotPassword } from '../../../state/modules/users/actions';
import ForgotPasswordForm from './ForgotPasswordForm';


export type Props = {
  dispatch?: Function,
};

class ForgotPassword extends PureComponent {

  props: Props;

  handleSubmit = (values) => {
    const email = values.email;
    this.props.dispatch(forgotPassword(email));
  }
  render() {
    return (
      <div className="boldr-form__forgot">
        <FormCard title="Forgot Password" form={ <ForgotPasswordForm onSubmit={ this.handleSubmit } /> } />
      </div>
    );
  }
}

export default connect()(ForgotPassword);
