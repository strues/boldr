/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Headline from '@boldr/ui/Headline';
import Icon from '@boldr/ui/Icons/Icon';
import ContentPromo from '@boldr/ui/ContentPromo';
import Tabs from '@boldr/ui/Tabs';

export type Props = {
  currentUser: User,
};

// eslint-disable-next-line
const TabPanel = Tabs.TabPanel;
// @TODO: ditch component state for redux
class DashboardLanding extends Component {
  state = {
    activeId: '1',
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
          {/* @TODO: Add to user's database table a one time install column then never show this
          again unless prompted. istead use something else */}
          <Headline kind="h1">
            Welcome {this.props.currentUser.firstName}
          </Headline>
        </ContentPromo>
        <Tabs type="slider" activeId={this.state.activeId} onTabChange={this.onTabChange}>
          <TabPanel tab={<span>Tab1</span>} id="1">
            <div className="feed-grid">
              <div className="card-half wide">
                <div className="card-img">
                  <span className="label">as</span>
                  <img alt="img" src="http://i.magaimg.net/img/yym.png" />
                </div>
                <div className="card-text">This is some text</div>
                <ul className="card-tools">
                  <li className="tools-item">
                    <Icon kind="package" color="#222" />
                  </li>
                  <li className="tools-item">
                    <Icon kind="account-card" color="#222" />
                  </li>
                </ul>
              </div>
              <div className="card">
                <div className="card-img">
                  <img alt="img" src="http://i.magaimg.net/img/yyn.png" />
                </div>
                <div className="info-center">This background is pink...</div>
              </div>
            </div>
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

const mapStateToProps = state => ({ currentUser: state.auth.info });

export default connect(mapStateToProps)(DashboardLanding);
