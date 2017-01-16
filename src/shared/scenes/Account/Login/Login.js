/* @flow */
import React from 'react';
import { Link } from 'react-router';
import { Card, CardTitle, CardText } from 'material-ui/Card';

import { Grid, Col, Row } from '../../../components/Layout';

import LoginForm from './LoginForm';

type Props = {
  handleOnSubmit: Function,
};

const Login = (props: Props) => {
  return (
      <div>
          <Grid>
            <Row>
              <Col xs={ 12 }>
                <Row xsCenter>
                  <Col xs={ 6 }>
                    <Card>
                      <CardTitle title="Log In" />
                      <CardText>
                        <LoginForm onSubmit={ props.handleOnSubmit } />
                        <Link to="/account/forgot-password">Forgot your password?</Link><br />
                        <Link to="/account/signup">Create an account</Link>
                      </CardText>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
      </div>
  );
};

export default Login;
