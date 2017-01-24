/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-md/lib/Buttons';
import { TextField } from '../../../components/Form';
import { Row, Col } from '../../../components/Layout';

type Props = {
  handleSubmit?: Function
};

const LoginForm = (props: Props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={ handleSubmit } className="boldr-form__generic">
      <Row>
        <Col xs={ 12 }>
          <Row xsCenter>
            <Col xs={ 6 }>
              <Field name="email"
                type="email"
                component={ TextField }
                label="Email address"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={ 12 }>
          <Row xsCenter>
            <Col xs={ 6 }>
              <Field name="password"
                type="password"
                component={ TextField }
                label="Password"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Button style={ { marginTop: '25px' } } raised primary label="Login" type="submit" />
    </form>
  );
};

export default reduxForm({
  form: 'userLoginForm',
})(LoginForm);
