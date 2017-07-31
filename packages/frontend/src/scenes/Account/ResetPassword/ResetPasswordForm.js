/* @flow */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@boldr/ui/Button';
import Form, { TextFormField } from '@boldr/ui/Form';

const style = {
  margin: 12,
};
export type Props = {
  handleSubmit: Function,
  submitting?: boolean,
  pristine?: boolean,
};
const ResetPasswordForm = (props: Props) => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <Form onSubmit={handleSubmit} className="boldrui-form boldrui-form--reset">
      <Field
        id="password"
        name="password"
        type="password"
        label="Enter a new password"
        component={TextFormField}
      />
      <Field
        id="confirm"
        name="confirm"
        type="password"
        label="Confirm new password."
        component={TextFormField}
      />
      <Button htmlType="submit" style={style} kind="primary" disabled={submitting || pristine}>
        Reset Password
      </Button>
    </Form>
  );
};

export default reduxForm({
  form: 'resetPasswordForm',
})(ResetPasswordForm);
