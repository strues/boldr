/* @flow */
import React from 'react';
import { connect } from 'react-redux';

import BaseTemplate from '../../pages/templates/Base';
import type { ReactElement } from '../../types/react';

type Props = { children: ReactElement, auth: Object }; // eslint-disable-line

const Account = (props: Props) => {
  return (
    <BaseTemplate>
      { props.children }
    </BaseTemplate>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.account.auth,
  };
}

export default connect(mapStateToProps)(Account);
