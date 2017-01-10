// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Card, CardTitle, CardText } from 'material-ui/Card';

import { Grid, Col, Row } from '../../../components/Layout';
import SignupForm from './SignupForm';

type Props = {
  handleOnSubmit: Function,
};

const Signup = (props: Props) => {
  return (
      <Grid>
        <Row>
          <Col xs={ 12 }>
            <Row xsCenter>
              <Col xs={ 8 }>
                <Card style={ { width: '650px', marginBottom: '400px' } }>
                  <CardTitle title="Signup" />
                  <CardText>
                    <SignupForm onSubmit={ props.handleOnSubmit } />
                    Already have an account?
                    <Link to="/account/login"> Login</Link>
                  </CardText>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
  );
};

export default Signup;
