/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { bindActionCreators } from 'redux';
import Headline from '@boldr/ui/Headline';
import ContentPromo from '@boldr/ui/ContentPromo';
import Tabs from '../../components/Tabs';
// import { updateMenuDetails, addMenuDetail } from '../../../state/boldr/menu/actions';
// import Navigation from './Navigation';

type Props = {
  data: Object,
  actions: Object,
};

const TabPanel = Tabs.TabPanel;

class Content extends Component {
  state = {
    activeId: '2',
  };

  onTabChange = id => {
    this.setState({
      activeId: id,
    });
  };
  props: Props;
  render() {
    return (
      <div>
        <ContentPromo isCentered>
          <Headline kind="h1">Navigation</Headline>
        </ContentPromo>
        <Tabs type="slider" activeId={this.state.activeId} onTabChange={this.onTabChange}>
          <TabPanel tab={<span>Tab1</span>} id="1" disabled>
            <div>a</div>
          </TabPanel>
          <TabPanel tab="2" id="2">
            <div>asdfasdf</div>
          </TabPanel>
          <TabPanel tab="3" id="3">
            <div>asdfasdf</div>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default Content;
