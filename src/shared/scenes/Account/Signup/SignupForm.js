/* @flow */
import React from 'react';
import {
  Field,
  reduxForm,
  getFormSyncErrors,
  isValid,
} from 'redux-form';
import Button from 'react-md/lib/Buttons';
import { InputField } from '../../../components/Form';
import { Row, Col } from '../../../components/Layout';
import validate, { requiredValidator, emailValidator } from './validate';

type Props = {
  handleSubmit?: Function
};

const SignupForm = (props: Props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={ handleSubmit } className="boldr-form__generic">
      <Row>
        <Col xs={ 6 }>
          <Field
            id="email"
            name="email"
            type="email"
            component={ InputField }
            label="Email address"
            validate={ [requiredValidator, emailValidator] }
          />
      </Col>
      <Col xs={ 6 }>
        <Field
          id="password"
          name="password"
          type="password"
          component={ InputField }
          label="Password"
        />
      </Col>
      </Row>
      <Row>
        <Col xs={ 6 }>
        <Field
          id="first-name"
          name="first_name"
          type="text"
          component={ InputField }
          label="First name"
        />
      </Col>
      <Col xs={ 6 }>
        <Field
          id="last-name"
          name="last_name"
          type="text"
          component={ InputField }
          label="Last name"
        />
      </Col>
      </Row>
      <Row>
        <Col xs={ 12 }>
          <Row xsCenter>
            <Col xs={ 6 }>
              <Field
                id="username"
                name="username"
                type="text"
                component={ InputField }
                label="Username"
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Button style={ { marginTop: '25px' } } raised primary label="Create Account" type="submit" />
    </form>
  );
};

export default reduxForm({
  form: 'userSignupForm',
  validate,
  destroyOnUnmount: false,
})(SignupForm);
