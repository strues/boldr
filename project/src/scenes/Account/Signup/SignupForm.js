/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
// internal
import Row from '@boldr/ui/Layout/Row';
import Col from '@boldr/ui/Layout/Col';
import Button from '@boldr/ui/Button';
import Form, { TextFormField } from '@boldr/ui/Form';
import { validations } from '@boldr/core';

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
            component={TextFormField}
            label="Email address"
            placeholder="admin@boldr.io"
            validate={[validations.isRequired, validations.isEmail]}
          />
        </Col>
        <Col sm={6}>
          <Field
            id="password"
            name="password"
            type="password"
            component={TextFormField}
            label="Password"
            placeholder="*****"
            validate={[validations.isRequired]}
          />
        </Col>
      </Row>
      <Button
        style={{ marginTop: '25px' }}
        htmlType="submit"
        kind="primary"
        disabled={submitting || pristine}
        block>
        Create Account
      </Button>
    </Form>
  );
};

export default reduxForm({
  form: 'userSignupForm',
  destroyOnUnmount: false,
})(SignupForm);
