/* @flow */
import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import noop from 'lodash/noop';

import Tab from './Tab';
import navUtil from './util/navUtil';

export type Props = {
  className?: string,
  children: ReactChildren,
  prefix?: string,
  tabListData?: Array<any>,
  onChange?: Function,
  type?: string,
  align?: string,
  size?: string,
  onDelete?: Function,
  onTabAdd?: Function,
  candel?: boolean,
  canadd?: boolean,
  uniqueId?: number,
};

class Nav extends Component {
  static defaultProps = {
    prefix: 'boldrui',
    onChange: noop,
    tabListData: [],
    type: 'normal',
    align: 'left',
    size: 'normal',
    onDelete: noop,
    candel: false,
    canadd: false,
    onTabAdd: noop,
    uniqueId: 0,
  };

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    this.positionInkBar();
  }
  props: Props;
  positionInkBar() {
    const { type } = this.props;
    if (type === 'slider') {
      const activeTabDom = ReactDOM.findDOMNode(this.activeTab);
      if (activeTabDom) {
        const activeTabInner = activeTabDom.children[0];
        const activeTabInnerContentDom = activeTabInner.children[0];
        const targetDom = activeTabInnerContentDom || activeTabInner;
        let tWidth = navUtil.getOffsetWH(targetDom);
        const tLeft = navUtil.getOffsetLT(targetDom);
        let wrapLeft = navUtil.getOffsetLT(this.tabwrapDom);
        if (!activeTabInnerContentDom) {
          const cssStyle = window.getComputedStyle(activeTabInner);
          const paddingLeft = window.parseInt(cssStyle.paddingLeft);
          const paddingRight = window.parseInt(cssStyle.paddingRight);
          tWidth = tWidth - paddingLeft - paddingRight;
          wrapLeft -= paddingLeft;
        }
        this.inkBarDom.style.width = `${tWidth}px`;
        this.inkBarDom.style.left = `${tLeft - wrapLeft}px`;
      }
    }
  }

  onTabSelected = id => {
    const { onChange } = this.props;
    // change
    onChange(id);
  };

  onTabDel = id => {
    const { onDelete } = this.props;
    onDelete(id);
  };

  onTabAdd = () => {
    const { onTabAdd } = this.props;
    onTabAdd();
  };
  renderTabs() {
    const renderData = navUtil.modifyTabListData(this.props);
    const TabList = [];
    renderData.forEach(renderDataItem => {
      const refParam = {};
      if (renderDataItem.actived) {
        refParam.ref = c => {
          this.activeTab = c;
        };
      }
      TabList.push(
        <Tab
          prefix={this.props.prefix}
          onSelected={this.onTabSelected}
          onDelete={this.onTabDel}
          uniqueId={this.props.uniqueId}
          {...renderDataItem}
          id={renderDataItem.key}
          {...refParam}
        >
          {renderDataItem.title}
        </Tab>,
      );
    });
    return TabList;
  }

  render() {
    const { prefix, align, canadd, size, type } = this.props;
    let classes = `${prefix}-tabs-size-${size} ${prefix}-tabs-type-${type} ${prefix}-tabs-align-${align}`;
    if (type === 'slider' && size === 'normal') {
      classes += ` ${prefix}-tabs-third-level`;
    }
    let addOperation = '';
    if (canadd && align !== 'center') {
      addOperation = (
        <div className={`${prefix}-tabs-nav-add`} onClick={this.onTabAdd}>
          <span>+</span>
        </div>
      );
    }

    return (
      <div className={`${prefix}-tabs-nav ${classes}`}>
        <div
          className={`${prefix}-tabs-nav-content`}
          ref={r => {
            this.navContentDom = ReactDOM.findDOMNode(r);
          }}
        >
          {addOperation}
          <div className={`${prefix}-tabs-scroll`}>
            <div
              className={`${prefix}-tabs-tabwrap`}
              role="tablist"
              ref={c => {
                this.tabwrapDom = c;
              }}
            >
              <span
                className={`${prefix}-tabs-nav-ink-bar`}
                ref={c => {
                  this.inkBarDom = c;
                }}
              />
              <div>
                {this.renderTabs()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
