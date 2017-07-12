/* @flow */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@boldr/ui/Button';
import InputField from '../../../components/Form/Fields/InputField';
import Form from '../../../components/Form/Form';

const style = {
  margin: 12,
};
export type Props = {
  handleSubmit: Function,
  submitting?: boolean,
  pristine?: boolean,
};
const ForgotPasswordForm = (props: Props) => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <Form onSubmit={handleSubmit} className="boldrui-form boldr-form--forgot">
      <Field
        id="email"
        name="email"
        type="email"
        placeholder="admin@boldr.io"
        label="Email Address"
        component={InputField}
      />
      <Button
        htmlType="submit"
        style={style}
        kind="primary"
        disabled={submitting || pristine}
        outline
        block
      >
        Send Reset Link
      </Button>
    </Form>
  );
};

export default reduxForm({
  form: 'forgotPasswordForm',
})(ForgotPasswordForm);
