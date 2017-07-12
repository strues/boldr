/* @flow */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Grid, Col, Row } from '@boldr/ui/Layout';
import Paper from '@boldr/ui/Paper';
import LoginForm from './LoginForm';

type Props = {
  onSubmit: () => void,
};

const Spacer = styled.div`margin-top: 100px;`;
const Login = (props: Props) => {
  function submitLogin(formInput) {
    props.onSubmit(formInput);
  }
  return (
    <div className="login-wrapper">
      <Helmet title="Login" />
      <Grid>
        <Row>
          <Col xs={12}>
            <Row xsCenter>
              <Col xs={6}>
                <Spacer />
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
