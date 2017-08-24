// @flow
import * as React from 'react';
import Tabs from '@boldr/ui/Tabs';

type Props = {};
type State = {
  activeId: string,
};
// eslint-disable-next-line
const TabPanel = Tabs.TabPanel;

class Content extends React.Component<Props, State> {
  state: State = {
    activeId: '1',
  };
  onTabChange = id => {
    this.setState({
      activeId: id,
    });
  };
  render() {
    return (
      <div>
        <Tabs type="slider" activeId={this.state.activeId} onTabChange={this.onTabChange}>
          <TabPanel tab={<span>Tab1</span>} id="1">
            <div className="feed-grid">
              <div className="card-half wide">
                <div className="card-img">
                  <span className="label">as</span>
                  <img alt="img" src="http://i.magaimg.net/img/yym.png" />
                </div>
                <div className="card-text">This is some text</div>
              </div>
              <div className="card">
                <div className="card-img">
                  <img alt="img" src="http://i.magaimg.net/img/yyn.png" />
                </div>
                <div className="info-center">This background is pink...</div>
              </div>
            </div>
          </TabPanel>
          <TabPanel tab={<span>Tab2</span>} id="2">
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
