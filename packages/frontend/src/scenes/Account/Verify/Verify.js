/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Button from '@boldr/ui/Button';
// internal
import FormCard from '@boldr/ui/Form/FormCard/FormCard';
import { verifyAccount } from '../state/actions';

export type Props = {
  dispatch: () => void,
  match: Object,
};

class Verify extends Component {
  props: Props;

  handleVerify = (event: Event): void => {
    event.preventDefault();
    this.props.dispatch(verifyAccount(this.props.match.params.token));
  };

  render() {
    return (
      <div className="verify-wrapper">
        <Helmet title="Verify Account" />
        <FormCard
          title="Account verification"
          skinny
          lightText
          form={
            <Button onClick={this.handleVerify} kind="primary" block>
              Verify
            </Button>
          }
        />
      </div>
    );
  }
}

export default connect()(Verify);
