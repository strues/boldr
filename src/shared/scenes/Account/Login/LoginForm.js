/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-md/lib/Buttons';
import { InputField, Row, Col } from 'boldr-ui';

type Props = {
  handleSubmit: Function,
};

const LoginForm = (props: Props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={ handleSubmit } className="boldr-form__generic">
      <Field id="email" name="email" type="email" component={ InputField } label="Email address" />
      <Field id="password" name="password" type="password" component={ InputField } label="Password" />
      <Button style={ { marginTop: '25px' } } raised primary label="Login" type="submit" />
    </form>
  );
};

export default reduxForm({
  form: 'userLoginForm',
})(LoginForm);
