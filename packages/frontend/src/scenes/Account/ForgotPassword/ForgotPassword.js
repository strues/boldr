/* @flow */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Card, { CardText, CardTitle } from '@boldr/ui/Card';
import Flex from '@boldr/ui/Flex';
import { forgotPassword } from '../state/actions';
import ForgotPasswordForm from './ForgotPasswordForm';

type Props = {
  dispatch: Function,
};

class ForgotPassword extends PureComponent<Props, void> {
  handleSubmit = values => {
    const { email } = values;
    this.props.dispatch(forgotPassword(email));
  };
  render() {
    return (
      <div>
        <Helmet title="Forgot Password" />
        <Flex justify="center" align="center">
          <Card>
            <CardTitle title="Forgot Password" />
            <CardText>
              <ForgotPasswordForm onSubmit={this.handleSubmit} />
            </CardText>
          </Card>
        </Flex>
      </div>
    );
  }
}

export default connect()(ForgotPassword);
