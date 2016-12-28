/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Grid, Col, Row } from 'components/Layout';
import { login } from 'state/modules/auth/actions';
import LoginForm from './LoginForm';

const cardMeta = (
  <span>
    <Link to="/account/forgot-password">Forgot your password?</Link>
    <Link to="/account/signup">Create an account</Link>
  </span>
);
type Props = {
  auth: Object,
  login: () => void,
  redirect: String,
  handleOnSubmit: () => void
}
class Login extends Component {
  constructor(props) {
    super(props);
    (this: any).handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  props: Props;

  handleOnSubmit(values) {
    const { login } = this.props;
    const loginData = { email: values.email, password: values.password };
    const redir = this.props.redirect;
    login(loginData, redir);
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

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    redirect: ownProps.location.query.redirect,
  };
};

export default connect(mapStateToProps, { login })(Login);