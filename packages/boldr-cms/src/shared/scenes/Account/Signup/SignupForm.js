/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';

import { Row, Col } from '../../../components/Layout';
import validate from './validate';

type Props = {
  handleSubmit?: Function
};

const SignupForm = (props: Props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={ handleSubmit } className="card__form">
      <Row>
        <Col xs={ 6 }>
          <Field name="email"
            type="email"
            component={ TextField }
            floatingLabelText="Email address"
          />
      </Col>
      <Col xs={ 6 }>
        <Field name="password"
          type="password"
          component={ TextField }
          floatingLabelText="Password"
        />
      </Col>
      </Row>
      <Row>
        <Col xs={ 6 }>
        <Field name="first_name"
          type="text"
          component={ TextField }
          floatingLabelText="First name"
        />
      </Col>
      <Col xs={ 6 }>
        <Field name="last_name"
          type="text"
          component={ TextField }
          floatingLabelText="Last name"
        />
      </Col>
      </Row>
      <Row>
        <Col xs={ 12 }>
          <Row xsCenter>
            <Col xs={ 6 }>
              <Field name="display_name"
                type="text"
                component={ TextField }
                floatingLabelText="Display name"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <RaisedButton style={ { marginTop: '25px' } } primary label="Create Account" type="submit" />
    </form>
  );
};

export default reduxForm({
  form: 'userSignupForm',
  validate,
})(SignupForm);
