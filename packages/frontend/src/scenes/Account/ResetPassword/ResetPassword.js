/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Card, { CardText, CardTitle } from '@boldr/ui/Card';
import Flex from '@boldr/ui/Flex';
import { resetPassword } from '../state/actions';
import ResetPasswordForm from './ResetPasswordForm';

export type Props = {
  dispatch: () => void,
  match: Object,
};

type ResetPasswordInput = {
  password: string,
};

class ResetPassword extends Component<Props, *> {
  props: Props;

  handleReset = (values: ResetPasswordInput): void => {
    this.props.dispatch(resetPassword(values.password, this.props.match.params.token));
  };

  render() {
    return (
      <div className="resetpw-wrapper">
        <Helmet title="Reset Password" />
        <Flex justify="center" align="center">
          <Card>
            <CardTitle title="Reset Password" />
            <CardText>
              <ResetPasswordForm onSubmit={this.handleReset} />
            </CardText>
          </Card>
        </Flex>
      </div>
    );
  }
}

export default connect()(ResetPassword);
