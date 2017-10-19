/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import { Grid, Row, Col } from '@boldr/ui/Layout';
import type { AuthInput, AccountLoginResponse } from '../../../types/boldr';
import LoginForm from './LoginForm';
import styles from './style.css';

type Props = {
  onSubmit: AuthInput => AccountLoginResponse,
};

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
                <div className={styles.formSpacer}>
                  <LoginForm onSubmit={submitLogin} />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Login;
