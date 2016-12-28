import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Col, Row } from 'components/index';
import { forgotPassword } from 'state/modules/auth/actions';
import ForgotPasswordForm from './ForgotPasswordForm';

export type Props = {
  dispatch?: Function,
  account?: Object,
};

class ForgotPassword extends PureComponent {

  props: Props;

  handleSubmit = (values) => {
    const email = values.email;
    this.props.dispatch(forgotPassword(email));
  }
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={ 12 }>
              <Row xsCenter>
                <Col xs={ 6 }>
                  <Card style={ { width: '450px', marginTop: '50px' } }>
                    <ForgotPasswordForm onSubmit={ this.handleSubmit } />
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(ForgotPassword);
