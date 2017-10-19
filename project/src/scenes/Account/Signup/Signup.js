/* @flow */
import React from 'react';
import Link from 'react-router-dom/Link';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Grid, Row, Col } from '@boldr/ui/Layout';
import Paragraph from '@boldr/ui/Paragraph';
// internal
import SignupForm from './SignupForm';

import styles from './style.css';

export type SignupInput = {
  username: string,
  firstName: string,
  password: string,
  lastName: string,
  email: string,
};

const Signup = (props: { onSubmit: SignupInput => void }) => {
  const formBottom = (
    <div>
      <Paragraph>Already have an account?</Paragraph>
      <Link to="/login" className="boldrui-link">
        Login
      </Link>
    </div>
  );
  function submitSignup(formInput) {
    props.onSubmit(formInput);
  }
  return (
    <div className="signup-wrapper">
      <Helmet title="Signup" />
      <Grid>
        <Row>
          <Col xs={12}>
            <Row xsCenter>
              <Col xs={12} sm={8}>
                <div className={styles.formSpacer}>
                  <SignupForm onSubmit={submitSignup} />
                  {formBottom}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Signup;
