/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Link from 'react-router-dom/Link';
// $FlowIssue
import styled from 'styled-components';

import Button from '@boldr/ui/Button';
import Form, { TextFormField } from '@boldr/ui/Form';
import validations from '../../../core/util/validations';

type Props = {
  handleSubmit: Function,
  submitting?: boolean,
  pristine?: boolean,
};

const FormBottom = styled.div`
  justify-content: center;
  display: flex;
  width: 100%;
  font-size: 14px;
  text-align: center;
`;

const FormBottomList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const FormBottomListItem = styled.li`padding-left: 0;`;
const LoginForm = (props: Props) => {
  const { handleSubmit, submitting, pristine } = props;
  return (
    <Form onSubmit={handleSubmit} className="boldrui-form boldrui-form--login">
      <Field
        id="email"
        name="email"
        type="email"
        component={TextFormField}
        label="Email Address"
        placeholder="admin@boldr.io"
        validate={[validations.isEmail, validations.isRequired]}
      />
      <Field
        id="password"
        name="password"
        type="password"
        component={TextFormField}
        validate={[validations.isRequired]}
        placeholder="*****"
        label="Password"
      />
      <Button htmlType="submit" kind="primary" disabled={submitting || pristine} block>
        Login
      </Button>
      <FormBottom>
        <FormBottomList>
          <FormBottomListItem>
            <Link to="/account/forgot-password">Forgot your password?</Link>
          </FormBottomListItem>
          <FormBottomListItem>
            <Link to="/signup">Create an account</Link>
          </FormBottomListItem>
        </FormBottomList>
      </FormBottom>
    </Form>
  );
};

export default reduxForm({
  form: 'userLoginForm',
})(LoginForm);
