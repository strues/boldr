/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import Headline from '@boldr/ui/Headline';
import ContentPromo from '@boldr/ui/ContentPromo';

import Tabs from '@boldr/ui/Tabs';

import type { CurrentUser } from '../../types/boldr';

export type Props = {
  currentUser: CurrentUser,
};

const { TabPane } = Tabs;

class DashboardLanding extends React.Component<Props, *> {
  static defaultProps = {
    currentUser: {
      firstName: 'User',
    },
  };
  state = {
    activeId: '1',
  };

  onTabChange = key => {
    console.log(key);
  };

  render() {
    return (
      <div>
        <ContentPromo isCentered>
          <Headline kind="h1" text={`Welcome ${this.props.currentUser.firstName}`} />
        </ContentPromo>
        <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => ({ currentUser: state.auth.info });

export default connect(mapStateToProps)(DashboardLanding);
