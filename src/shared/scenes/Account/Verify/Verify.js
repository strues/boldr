/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// internal
import FormCard from '~components/Form/FormCard/FormCard';
import BaseTemplate from '../../../templates/BaseTemplate';
import Button from '~components/Button';
import { verifyAccount } from '~state/modules/users/actions';

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

  handleVerify(event): void {
    event.preventDefault();
    this.props.dispatch(verifyAccount(this.props.match.params.token));
  }

  render() {
    return (
      <BaseTemplate helmetMeta={<Helmet title="Verify Account" />}>
        <FormCard
          title="Account verification"
          skinny
          lightText
          form={<Button onClick={this.handleVerify} isFullWidth>Verify</Button>}
        />
      </BaseTemplate>
    );
  }
}

export default connect()(Verify);
