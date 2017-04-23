/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormCard } from 'boldr-ui';
import Helmet from 'react-helmet';

import BaseTemplate from '../../../templates/BaseTemplate';
import { verifyAccount } from '../../../state';

export type Props = {
  dispatch: () => void,
  match: Object,
};

class Verify extends Component {
  constructor(props: Props) {
    super(props);
    (this: any).handleVerify = this.handleVerify.bind(this);
  }
  props: Props;

  handleVerify(event, props): void {
    event.preventDefault();
    this.props.dispatch(verifyAccount(this.props.match.params.token));
  }

  render() {
    return (
      <BaseTemplate helmetMeta={<Helmet title="Verify Account" />}>
        <FormCard
          title="Account verification"
          form={
            <Button raised primary label="Verify" onClick={this.handleVerify} />
          }
        />
      </BaseTemplate>
    );
  }
}

export default connect()(Verify);
