/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Col, Row } from '../../../components/index';
import { resetPassword } from '../../../state/modules/account/actions';
import ResetPasswordForm from './ResetPasswordForm';

type Props = {
  dispatch: () => void,
  params: Object
};

class ResetPassword extends Component {
  constructor(props: Props) {
    super(props);

    (this: any).handleReset = this.handleReset.bind(this);
  }
  props: Props;

  handleReset(values, props): void {
    this.props.dispatch(resetPassword(values.password, this.props.params.token));
  }

  render() {
    return (
      <div>
        <Grid fluid>
        <Row>
          <Col xs={ 12 }>
            <Row xsCenter>
              <Col xs={ 6 }>
                <Card style={ { width: '450px', marginTop: '50px' } }>
                    <CardTitle title="Reset Password" />
                    <CardText>
                  <ResetPasswordForm onSubmit={ this.handleReset } />
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

export default connect()(ResetPassword);
