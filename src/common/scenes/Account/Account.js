/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { Footer } from '../../components';
import PageTemplate from '../../theme/Boldr/PageTemplate';

export type Props = { children: ReactElement, auth: Object };
const Account = (props: Props) => {
  return (
    <div>
      <PageTemplate footer={ <Footer /> }>
        { props.children }
      </PageTemplate>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(Account);
