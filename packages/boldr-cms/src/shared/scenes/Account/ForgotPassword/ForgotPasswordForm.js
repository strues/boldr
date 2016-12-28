/* @flow */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};
type Props = {
  handleSubmit: Function
};
const ForgotPasswordForm = (props: Props) => {
  const { handleSubmit } = props;
  return (
      <form onSubmit={ handleSubmit } className="boldr__generic-form">
        <Field
          name="email"
          type="email"
          floatingLabelText="Email"
          component={ TextField }
        />
        <RaisedButton type="submit" label="Send reset link" style={ style } primary />
      </form>
  );
};

export default reduxForm({
  form: 'forgotPasswordForm',
})(ForgotPasswordForm);
