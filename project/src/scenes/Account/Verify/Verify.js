/* @flow */

import * as React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Button from '@boldr/ui/Button';
// internal

import Card, { CardText, CardTitle } from '@boldr/ui/Card';
import Flex from '@boldr/ui/Flex';
import { verifyAccount } from '../state/actions';

export type Props = {
  dispatch: () => void,
  match: Object,
};

class Verify extends React.PureComponent<Props, *> {
  props: Props;

  handleVerify = (event: Event): void => {
    event.preventDefault();
    this.props.dispatch(verifyAccount(this.props.match.params.token));
  };

  render() {
    return (
      <div className="verify-wrapper">
        <Helmet title="Verify Account" />
        <Flex justify="center" align="center">
          <Card>
            <CardTitle title="Account Verification" />
            <CardText>
              <Button onClick={this.handleVerify} kind="primary" block>
                Verify
              </Button>
            </CardText>
          </Card>
        </Flex>
      </div>
    );
  }
}

export default connect()(Verify);
