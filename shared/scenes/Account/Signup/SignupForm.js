/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-md/lib/Buttons';
import { TextField } from '../../../components/Form';
import { Row, Col } from '../../../components/Layout';
import validate from './validate';

type Props = {
  handleSubmit?: Function
};

const SignupForm = (props: Props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={ handleSubmit } className="boldr-form__generic">

          <Field
            id="signup-email"
            name="email"
            type="email"
            component={ TextField }
            label="Email address"
          />

        <Field
          id="signup-password"
          name="password"
          type="password"
          component={ TextField }
          label="Password"
        />

        <Field
          id="signup-first_n"
          name="first_name"
          type="text"
          component={ TextField }
          label="First name"
        />

        <Field
          id="signup-last_n"
          name="last_name"
          type="text"
          component={ TextField }
          label="Last name"
        />

        <Field
          id="signup_display"
          name="display_name"
          type="text"
          component={ TextField }
          label="Display name"
        />

      <Button style={ { marginTop: '25px' } } raised primary label="Create Account" type="submit" />
    </form>
  );
};

export default reduxForm({
  form: 'userSignupForm',
  validate,
})(SignupForm);
