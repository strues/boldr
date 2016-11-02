import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Form } from 'semantic-ui-react';
import { Heading, Grid, Col, Row } from 'components/index';
import inlineStyles from 'theme/inlineStyles';
import { forgotPassword } from 'state/dux/auth';

export type Props = {
  dispatch?: Function,
  account?: Object,
};

class ForgotPassword extends Component {
  constructor(props: Props) {
    super(props);
    this.state = { serializedForm: {} };

    this.handleChange = this.handleChange.bind(this);
    this.handleForgot = this.handleForgot.bind(this);
  }

  props: Props;

  handleChange = (e, { value }) => this.setState({ value });

  handleForgot(event, dispatch) {
    event.preventDefault();
    this.props.dispatch(forgotPassword(this.state.email));
  }

  handleSubmit = (e, serializedForm) => {
    e.preventDefault();
    this.setState({ serializedForm });

    const email = serializedForm.email;
    this.props.dispatch(forgotPassword(email));
  }
  render() {
    const { serializedForm, value } = this.state;
    const renderHeader = (
      <Card.Header>
      <Heading size={ 1 } bottom="10px">Forgot your password?</Heading>
      </Card.Header>
    );
    return (
      <div style={ inlineStyles.headerOverflow }>
        <Grid>
          <Row>
            <Col xs={ 12 }>
              <Row xsCenter>
                <Col xs={ 6 }>
                  <Card style={ { width: '450px', marginTop: '150px' } }>
                    <Form onSubmit={ this.handleSubmit } className="card__form">
                    <Card.Content>
                      { renderHeader }
                      <Card.Meta>
                        Enter your email address below to reset it.
                      </Card.Meta>

                      <Form.Input
                        label="Email address"
                        name="email"
                        placeholder="Enter your email"
                      />

                      <Button primary type="submit">Reset Password</Button>
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
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(ForgotPassword);
