/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Grid, Col, Row } from '@boldr/ui/Layout';
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
      <Helmet title="Account Login" />
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
