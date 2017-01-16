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
const ResetPasswordForm = (props: Props) => {
  const { handleSubmit } = props;
  return (
      <form onSubmit={ handleSubmit } className="boldr__generic-form">
        <Field
          name="password"
          type="password"
          floatingLabelText="Enter a new password"
          component={ TextField }
        />
        <Field
          name="confirm"
          type="password"
          floatingLabelText="Confirm new password."
          component={ TextField }
        />
        <RaisedButton type="submit" label="Reset password" style={ style } primary />
      </form>
  );
};

export default reduxForm({
  form: 'resetPasswordForm',
})(ResetPasswordForm);
