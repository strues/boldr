// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { Card, CardTitle, CardText } from 'material-ui/Card';

import { Grid, Col, Row } from '../../../components/Layout';
import { doSignup } from '../actions';
import SignupForm from './SignupForm';

type Props = {
  doSignup: () => void,
  handleOnSubmit: () => void,
  loading: Boolean,
  auth: Object,
  dispatch: () => void,
};

class Signup extends Component {
  constructor(props) {
    super(props);
    (this: any).handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  props: Props;

  handleOnSubmit(values: Object) {
    this.props.dispatch(doSignup({
      email: values.email,
      password: values.password,
      first_name: values.first_name,
      last_name: values.last_name,
      display_name: values.display_name,
    }));
  }

  render() {
    return (
        <div>
          <Helmet title="Signup" />
          <Grid>
            <Row>
              <Col xs={ 12 }>
                <Row xsCenter>
                  <Col xs={ 8 }>
                    <Card style={ { width: '650px', marginBottom: '400px' } }>
                      <CardTitle title="Signup" />
                      <CardText>
                        <SignupForm onSubmit={ this.handleOnSubmit } />
                        Already have an account?
                        <Link to="/account/login"> Login</Link>
                      </CardText>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </div>
    );
  }
}

export default connect()(Signup);
