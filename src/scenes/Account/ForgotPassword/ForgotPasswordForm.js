/* @flow */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import InputField from '../../../components/Form/Fields/InputField';
import Form from '../../../components/Form/Form';
import Button from '@boldr/ui/Button';

const style = {
  margin: 12,
};
type Props = {
  handleSubmit: Function,
};
const ForgotPasswordForm = (props: Props) => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit} className="boldr-form__generic">
      <Field id="email" name="email" type="email" label="Email" component={InputField} />
      <Button htmlType="submit" style={style} kind="primary" outline>Send Reset Link</Button>
    </Form>
  );
};

export default reduxForm({
  form: 'forgotPasswordForm',
})(ForgotPasswordForm);
