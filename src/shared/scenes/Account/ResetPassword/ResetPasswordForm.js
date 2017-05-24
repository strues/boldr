/* @flow */

import React from 'react';
import { Field, reduxForm } from 'redux-form';

import InputField from 'boldr-ui/lib/components/Form/Fields/InputField';
import Form from 'boldr-ui/lib/components/Form/Form';
import Button from '../../../components/Button';

const style = {
  margin: 12,
};
type Props = {
  handleSubmit: Function,
};
const ResetPasswordForm = (props: Props) => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit} className="boldr-form__generic">
      <Field
        id="password"
        name="password"
        type="password"
        label="Enter a new password"
        component={InputField}
      />
      <Field
        id="confirm"
        name="confirm"
        type="password"
        label="Confirm new password."
        component={InputField}
      />
      <Button type="submit" style={style}>Reset Password</Button>
    </Form>
  );
};

export default reduxForm({
  form: 'resetPasswordForm',
})(ResetPasswordForm);
