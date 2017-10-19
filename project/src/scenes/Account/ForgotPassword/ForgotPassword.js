/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Grid, Row, Col } from '@boldr/ui/Layout';
import Paragraph from '@boldr/ui/Paragraph';
import { forgotPassword } from '../state/actions';
import ForgotPasswordForm from './ForgotPasswordForm';

import styles from './style.css';

type Props = {
  dispatch: Function,
};

class ForgotPassword extends React.Component<Props, *> {
  handleSubmit = values => {
    const { email } = values;
    this.props.dispatch(forgotPassword(email));
  };

  render() {
    return (
      <div className="forgotpw-wrapper">
        <Helmet title="Forgot Password" />
        <Grid>
          <Row>
            <Col xs={12}>
              <Row xsCenter>
                <Col xs={6}>
                  <div className={styles.formSpacer}>
                    <Paragraph>Enter your email to reset your password</Paragraph>
                    <ForgotPasswordForm onSubmit={this.handleSubmit} />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect()(ForgotPassword);
