/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Link from 'react-router-dom/Link';

import Row from 'boldr-ui/lib/components/Layout/Row';
import Button from 'boldr-ui/lib/components/Button';
import InputField from 'boldr-ui/lib/components/Form/Fields/InputField';
import Form from 'boldr-ui/lib/components/Form/Form';
import { isEmail } from '../../../core/validations';

type Props = {
  handleSubmit: Function,
};

const LoginForm = (props: Props) => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit} className="boldr-form__generic">
      <Field
        id="email"
        name="email"
        type="email"
        component={InputField}
        label="Email address"
        validate={[isEmail]}
      />
      <Field
        id="password"
        name="password"
        type="password"
        component={InputField}
        label="Password"
      />
      <Button type="submit" isFullWidth>Login</Button>
      <Row style={{ justifyContent: 'center' }}>
        <Link to="/account/forgot-password">Forgot your password?</Link>
      </Row>
      <Row style={{ justifyContent: 'center' }}>
        <Link to="/account/signup">Create an account</Link>
      </Row>
    </Form>
  );
};

export default reduxForm({
  form: 'userLoginForm',
})(LoginForm);
