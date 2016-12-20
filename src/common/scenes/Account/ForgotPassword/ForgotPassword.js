import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Col, Row } from 'components/index';
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
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={ 12 }>
              <Row xsCenter>
                <Col xs={ 6 }>
                  <Card style={ { width: '450px', marginTop: '50px' } }>
                    <form onSubmit={ this.handleSubmit } className="card__form">
                      <CardTitle title="Forgot your password?" />
                      <CardText>
                        Enter your email address below to reset it.
                      <TextField
                        floatingLabelText="Email address"
                        name="email"
                        hintText="Enter your email"
                      />
                    </CardText>
                    <CardActions>
                      <RaisedButton primary type="submit" label="Reset Password" />
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
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(ForgotPassword);
