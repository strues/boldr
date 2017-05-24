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
const ForgotPasswordForm = (props: Props) => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit} className="boldr-form__generic">
      <Field
        id="email"
        name="email"
        type="email"
        label="Email"
        component={InputField}
      />
      <Button type="submit" style={style} isFullWidth>Send Reset Link</Button>
    </Form>
  );
};

export default reduxForm({
  form: 'forgotPasswordForm',
})(ForgotPasswordForm);
