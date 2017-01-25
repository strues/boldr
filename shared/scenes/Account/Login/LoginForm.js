/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons';
import { TextField } from '../../../components/Form';
import { Row, Col } from '../../../components/Layout';

type Props = {
  handleSubmit?: Function
};
const buttonStyle = { marginLeft: 'auto', marginRight: 'auto', marginTop: '25px' };
const LoginForm = (props: Props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={ handleSubmit } className="boldr-form__generic">
      <Field
        id="login-email"
        name="email"
        type="email"
        component={ TextField }
        label="Email address"
      />
      <Field
        id="login-password"
        name="password"
        type="password"
        component={ TextField }
        label="Password"
      />
      <Button style={ buttonStyle } raised primary label="Login" type="submit" />
    </form>
  );
};

export default reduxForm({
  form: 'userLoginForm',
})(LoginForm);
