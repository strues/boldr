/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';
import { Row, Col } from 'components/Layout';

type Props = {
  handleSubmit?: Function
};

const LoginForm = (props: Props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={ handleSubmit } className="card__form">
      <Row>
        <Col xs={ 12 }>
          <Row xsCenter>
            <Col xs={ 6 }>
              <Field name="email"
                type="email"
                component={ TextField }
                floatingLabelText="Email address"
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
                floatingLabelText="Password"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <RaisedButton style={ { marginTop: '25px' } } primary label="Login" type="submit" />
    </form>
  );
};

export default reduxForm({
  form: 'userLoginForm',
})(LoginForm);
