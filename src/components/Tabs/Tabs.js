/* @flow */
import React, { Component } from 'react';
import assign from 'lodash/assign';
import noop from 'lodash/noop';

import TabPanel from './TabPanel';
import LazyMount from './LazyMount';
import Nav from './Nav';
import tabUtil from './util/tabUtil';

type TabT = {
  key: string | number,
  title: string,
  disabled?: boolean,
};

type Props = {
  className?: string,
  children: ReactChildren,
  prefix?: string,
  type?: string,
  activeKey?: string | number,
  activeId?: string | number,
  size?: string,
  align?: string,
  onTabChange?: Function,
  onTabDel?: Function,
  onTabAdd?: Function,
  candel?: boolean,
  canadd?: boolean,
  tabs: Array<TabT>,
};
class Tabs extends Component {
  static defaultProps = {
    prefix: 'boldrui',
    className: '',
    type: 'normal',
    activeKey: '',
    activeId: '',
    size: 'normal',
    align: 'left',
    onTabChange: noop,
    onTabDel: noop,
    onTabAdd: noop,
    candel: false,
    canadd: false,
  };

  static uniqueId = 0;

  static TabPanel = TabPanel;

  constructor(props) {
    super(props);
    Tabs.uniqueId++;
  }
  props: Props;
  onTabChange = selectKey => {
    const { onTabChange } = this.props;
    if (onTabChange) {
      onTabChange(selectKey);
    }
  };

  onTabDel = tabKey => {
    const { onTabDel } = this.props;
    if (onTabDel) {
      onTabDel(tabKey);
    }
  };

  onTabAdd = () => {
    const { onTabAdd } = this.props;
    if (onTabAdd) {
      onTabAdd();
    }
  };

  renderNav(tabListData) {
    const { type, align, canadd, candel, prefix, size } = this.props;
    if (tabListData && tabListData.length) {
      return (
        <Nav
          onChange={this.onTabChange}
          tabListData={tabListData}
          type={type}
          align={align}
          size={size}
          onDelete={this.onTabDel}
          onTabAdd={this.onTabAdd}
          canadd={canadd}
          candel={candel}
          prefix={prefix}
          uniqueId={Tabs.uniqueId}
        />
      );
    }
  }

  renderTabPanel(tabListData) {
    const { prefix } = this.props;
    const newChildren = [];
    if (tabListData && tabListData.length) {
      tabListData.forEach(tabItem => {
        newChildren.push(
          <LazyMount mountTrigger={tabItem.actived} key={tabItem.key}>
            <TabPanel
              tab={tabItem.title}
              actived={tabItem.actived}
              onTabReady={tabItem.onTabReady}
              prefix={prefix}
              className={tabItem.panelClassName}
              id={tabItem.key}
              uniqueId={Tabs.uniqueId}
            >
              {tabItem.content}
            </TabPanel>
          </LazyMount>,
        );
      });
      return newChildren;
    }
    return null;
  }

  renderWithPanel() {
    const { prefix, className, children, activeKey } = this.props;
    let { activeId } = this.props;
    activeId = activeId || activeKey;
    const tabListData = tabUtil.getTabListData(children, activeId);
    return (
      <div className={`${prefix}-tabs ${className}`}>
        {this.renderNav(tabListData)}
        <div className={`${prefix}-tabs-panewrap`}>
          {this.renderTabPanel(tabListData)}
        </div>
      </div>
    );
  }

  renderWithoutPanel() {
    const { tabs, prefix, className, activeId } = this.props;

    return (
      <div className={`${prefix}-tabs ${className}`}>
        {this.renderNav(tabs.map(tab => assign({}, tab, { actived: tab.key === activeId })))}
      </div>
    );
  }

  render() {
    const { tabs } = this.props;
    if (tabs) {
      return this.renderWithoutPanel();
    }
    return this.renderWithPanel();
  }
}

export default Tabs;
