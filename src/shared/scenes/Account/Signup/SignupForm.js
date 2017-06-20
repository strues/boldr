/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
// internal
import Row from '@@components/Layout/Row';
import Col from '@@components/Layout/Col';
import Button from '@@components/Button';
import InputField from '@@components/Form/Fields/InputField';
import Form from '@@components/Form/Form';
import { isRequired, isEmail } from '@@core/validations';

type Props = {
  handleSubmit: Function,
};

const SignupForm = (props: Props) => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit} className="boldr-form__generic">
      <Row>
        <Col sm={6}>
          <Field
            id="email"
            name="email"
            type="email"
            component={InputField}
            label="Email address"
            validate={[isRequired, isEmail]}
          />
        </Col>
        <Col sm={6}>
          <Field
            id="password"
            name="password"
            type="password"
            component={InputField}
            label="Password"
            validate={[isRequired]}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Field
            id="first-name"
            name="firstName"
            type="text"
            component={InputField}
            label="First name"
            validate={[isRequired]}
          />
        </Col>
        <Col sm={6}>
          <Field
            id="last-name"
            name="lastName"
            type="text"
            component={InputField}
            label="Last name"
            validate={[isRequired]}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Row>
            <Col sm={6} smOffset={3}>
              <Field
                id="username"
                name="username"
                type="text"
                component={InputField}
                label="Username"
                validate={[isRequired]}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Button style={{ marginTop: '25px' }} htmlType="submit" kind="primary" block>
        Create Account
      </Button>
    </Form>
  );
};

export default reduxForm({
  form: 'userSignupForm',
  destroyOnUnmount: false,
})(SignupForm);
