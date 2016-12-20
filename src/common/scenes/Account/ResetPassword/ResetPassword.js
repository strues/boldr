/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Col, Row } from 'components/index';
import { resetPassword } from 'state/dux/auth';

export type Props = {
  dispatch: () => void,
  params: Object
};

export type State = {
  password: string,
  confirm: string
}

class ResetPassword extends Component {
  constructor(props: Props) {
    super(props);
    this.state = { password: '', confirm: '' };

    (this: any).handleChange = this.handleChange.bind(this);
    (this: any).handleConfirmChange = this.handleConfirmChange.bind(this);
    (this: any).handleReset = this.handleReset.bind(this);
  }
  state: State;
  props: Props;

  handleChange(event) {
    this.setState({ password: event });
  }
  handleConfirmChange(event) {
    this.setState({ confirm: event });
  }
  handleReset(event, props): void {
    event.preventDefault();
    this.props.dispatch(resetPassword(this.state.password, this.props.params.token));
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
                  <form onSubmit={ this.handleReset } className="card__form">
                    <CardTitle title="Reset Password" />
                    <CardText>
                    <TextField
                      floatingLabelText="Password"
                      name="password"
                      type="password"
                      hintText="Enter your new password"
                    />
                    <TextField
                      floatingLabelText="Confirm Password"
                      name="confirm"
                      type="password"
                      hintText="Confirm your new password."
                    />
                  </CardText>
                  <CardActions>
                    <RaisedButton primary type="submit" label="Save Password" />
                  </CardActions>
                </form>
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
  return state;
};

export default connect(mapStateToProps)(ResetPassword);
