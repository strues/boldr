/* @flow */
import * as React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Grid, Row, Col } from '@boldr/ui/Layout';
import type { User } from '../../../types/boldr';
import LoginForm from './LoginForm';

type LoginFormInput = {
  email: string,
  password: string,
};
type LoginResponse = {
  token: string,
  user: User,
};

type Props = {
  onSubmit: LoginFormInput => LoginResponse,
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
