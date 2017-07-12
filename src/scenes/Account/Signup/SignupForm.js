/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
// internal
import Row from '@boldr/ui/Layout/Row';
import Col from '@boldr/ui/Layout/Col';
import Button from '@boldr/ui/Button';
import InputField from '@boldr/ui/Form/Fields/InputField';
import Form from '../../../components/Form/Form';
import { isRequired, isEmail } from '../../../core/util/validations';

type Props = {
  handleSubmit: Function,
  submitting?: boolean,
  pristine?: boolean,
};

const SignupForm = (props: Props) => {
  const { handleSubmit, submitting, pristine } = props;
  return (
    <Form onSubmit={handleSubmit} className="boldrui-form boldrui-form--signup">
      <Row>
        <Col sm={6}>
          <Field
            id="email"
            name="email"
            type="email"
            component={InputField}
            label="Email address"
            placeholder="admin@boldr.io"
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
            placeholder="*****"
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
            placeholder="Steven"
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
            placeholder="Smith"
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
                placeholder="AwesomeUserName"
                label="Username"
                validate={[isRequired]}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Button
        style={{ marginTop: '25px' }}
        htmlType="submit"
        kind="primary"
        disabled={submitting || pristine}
        block
      >
        Create Account
      </Button>
    </Form>
  );
};

export default reduxForm({
  form: 'userSignupForm',
  destroyOnUnmount: false,
})(SignupForm);
