/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Heading, Grid, Button, Col, Row } from 'components/index';
import { Card, Form } from 'semantic-ui-react';
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
    const renderHeader = (
      <div>
        <Heading size={ 1 } bottom="10px">Forgot your password?</Heading>
          Enter your email address below to reset it.
      </div>
    );
    return (
      <div>
        <Grid fluid>
        <Row>
          <Col xs={ 12 }>
            <Row xsCenter>
              <Col xs={ 6 }>
              <Card style={ { width: '450px', marginTop: '150px' } }>
                <Form onSubmit={ this.handleReset } className="card__form">
                <Card.Content>
                  { renderHeader }
                  <Card.Meta>
                    Enter a new password.
                  </Card.Meta>

                  <Form.Input
                    label="Password"
                    name="password"
                    placeholder="Enter your new password"
                  />
                  <Form.Input
                    label="Confirm password"
                    name="confirm"
                    placeholder="Confirm your new password."
                  />
                  <Button submit>Save Password</Button>
                  </Card.Content>
                </Form>
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
