/* @flow */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, InputField } from 'boldr-ui';

const style = {
  margin: 12,
};
type Props = {
  handleSubmit: Function,
};
const ForgotPasswordForm = (props: Props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} className="boldr-form__generic">
      <Field
        id="email"
        name="email"
        type="email"
        label="Email"
        component={InputField}
      />
      <Button
        type="submit"
        label="Send reset link"
        style={style}
        raised
        primary
      />
    </form>
  );
};

export default reduxForm({
  form: 'forgotPasswordForm',
})(ForgotPasswordForm);
