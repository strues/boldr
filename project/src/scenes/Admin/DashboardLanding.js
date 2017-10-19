/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import Heading from '@boldr/ui/Heading';
import ContentPromo from '@boldr/ui/ContentPromo';
import type { CurrentUser } from '../../types/boldr';

export type Props = {
  currentUser: CurrentUser,
};

class DashboardLanding extends React.Component<Props, *> {
  static defaultProps = {
    currentUser: {
      firstName: 'User',
    },
  };

  onTabChange = key => {
    console.log(key);
  };

  render() {
    return (
      <div>
        <ContentPromo isCentered>
          <Heading kind="h1" text={`Welcome ${this.props.currentUser.firstName}`} />
        </ContentPromo>
      </div>
    );
  }
}

const mapStateToProps = state => ({ currentUser: state.auth.info });
// $FlowIssue
export default connect(mapStateToProps)(DashboardLanding);
