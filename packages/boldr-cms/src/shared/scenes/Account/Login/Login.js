/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { Card, CardTitle, CardText } from 'material-ui/Card';

import { Grid, Col, Row } from '../../../components/Layout';
import { doLogin } from '../actions';
import LoginForm from './LoginForm';

const cardMeta = (
  <span>
    <Link to="/account/forgot-password">Forgot your password?</Link>
    <Link to="/account/signup">Create an account</Link>
  </span>
);
type Props = {
  auth: Object,
  doLogin: () => void,
  redirect: String,
  dispatch: () => void,
  handleOnSubmit: () => void,
};
class Login extends Component {
  constructor(props) {
    super(props);
    (this: any).handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  props: Props;

  handleOnSubmit(values) {
    const { dispatch } = this.props;
    const loginData = { email: values.email, password: values.password };
    const redir = this.props.redirect;
    dispatch(doLogin(loginData));
  }

  render() {
    return (
      <div>
        <Helmet title="Login" />
          <Grid>
            <Row>
              <Col xs={ 12 }>
                <Row xsCenter>
                  <Col xs={ 6 }>
                    <Card style={ { width: '450px' } }>
                      <CardTitle title="Log In" />
                      <CardText>
                      <LoginForm onSubmit={ this.handleOnSubmit } />
                      { cardMeta }
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

export default connect()(Login);
