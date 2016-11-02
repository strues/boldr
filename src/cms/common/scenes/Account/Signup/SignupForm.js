/* @flow */
import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'semantic-ui-react';
import validate from './validate';

export type Props = {
  handleSubmit?: Function
};
const renderField = ({ input, label, type, meta: { touched, error } }) => ( // eslint-disable-line
  <Form.Input
    label={ label }
    className="form__auth"
    type={ type }
    { ...input }
  />
);

const SignupForm = (props) => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={ handleSubmit } className="card__form">
      <Form.Group widths="equal">
        <Field name="display_name"
          type="text"
          component={ renderField }
          label="Display name"
        />
        <Field name="password"
          type="password"
          component={ renderField }
          label="Password"
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Field name="first_name"
          type="text"
          component={ renderField }
          label="First name"
        />
        <Field name="last_name"
          type="text"
          component={ renderField }
          label="Last name"
        />
      </Form.Group>
      <Field name="email"
        type="email"
        component={ renderField }
        label="Email address"
      />
      <Button primary type="submit">Create Account</Button>
    </Form>
  );
};

export default reduxForm({
  form: 'userSignupForm',
  validate
})(SignupForm);
