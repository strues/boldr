/* @flow */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Grid, Col, Row } from '~components/Layout';
import FormCard from '~components/Form/FormCard';
import LoginForm from './LoginForm';

type Props = {
  onSubmit: () => void,
};
const Login = (props: Props) => {
  function submitLogin(formInput) {
    props.onSubmit(formInput);
  }
  return (
    <div className="boldr-form__login">
      <Helmet title="Login" />
      <Grid>
        <Row>
          <Col xs={12}>
            <Row center="xs">
              <Col xs={6}>
                <LoginForm onSubmit={submitLogin} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Login;
