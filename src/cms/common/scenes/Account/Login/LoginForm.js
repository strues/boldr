// @flow
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'semantic-ui-react';

export type Props = {
  handleSubmit?: Function,
  reset?: Function,
  submitting?: boolean,
  pristine?: boolean,
};
const renderField = ({ input, label, type, meta: { touched, error } }) => ( // eslint-disable-line
  <Form.Input
    label={ label }
    className="form__auth"
    type={ type }
    { ...input }
  />
);

const LoginForm = (props: Props) => {
  return (
      <Form onSubmit={ props.handleSubmit } className="card__form">
          <Field
            name="email"
            type="email"
            label="Email"
            component={ renderField }
          />

          <Field
            name="password"
            label="Password"
            type="password"
            component={ renderField }
            style={ { marginBottom: '50px' } }
          />
           <Button primary type="submit">Login</Button>
           <Button onClick={ props.reset }>Clear</Button>

      </Form>
  );
};

export default reduxForm({
  form: 'LoginForm',
})(LoginForm);
