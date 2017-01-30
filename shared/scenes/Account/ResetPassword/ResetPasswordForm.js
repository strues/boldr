/* @flow */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-md/lib/Buttons';
import { TextField } from '../../../components/Form';

const style = {
  margin: 12,
};
type Props = {
  handleSubmit: Function
};
const ResetPasswordForm = (props: Props) => {
  const { handleSubmit } = props;
  return (
      <form onSubmit={ handleSubmit } className="boldr-form__generic">
        <Field
          id="password"
          name="password"
          type="password"
          label="Enter a new password"
          component={ TextField }
        />
        <Field
          id="confirm"
          name="confirm"
          type="password"
          label="Confirm new password."
          component={ TextField }
        />
        <Button type="submit" label="Reset password" style={ style } raised primary />
      </form>
  );
};

export default reduxForm({
  form: 'resetPasswordForm',
})(ResetPasswordForm);
