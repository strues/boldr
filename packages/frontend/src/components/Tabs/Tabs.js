// @flow
import React from 'react';
import type { Node } from 'react';
import RcTabs, { TabPane } from 'rc-tabs';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import TabContent from 'rc-tabs/lib/TabContent';
import cn from 'classnames';
import Icon from '../Icons/Icon';

export type TabsType = 'line' | 'card' | 'editable-card';
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left';

export type TabsProps = {
  activeKey?: string,
  defaultActiveKey?: string,
  hideAdd?: boolean,
  children: Node,
  onChange?: (activeKey: string) => void,
  onTabClick?: Function,
  onPrevClick?: SyntheticEvent<>,
  onNextClick?: SyntheticEvent<>,
  tabBarExtraContent?: Node | null,
  tabBarStyle?: Object,
  type?: TabsType,
  tabPosition?: TabsPosition,
  onEdit?: (targetKey: string, action: any) => void,
  size?: 'default' | 'small',
  style?: Object,
  prefixCls?: string,
  className?: string,
  animated?: boolean | { inkBar: boolean, tabPane: boolean },
};

// Tabs
export type TabPaneProps = {
  tab?: Node | string,
  style?: Object,
  closable?: boolean,
  className?: string,
  disabled?: boolean,
};

export default class Tabs extends React.Component<TabsProps, any> {
  static TabPane = (TabPane: TabPaneProps);

  static defaultProps = {
    prefixCls: 'boldr-tabs',
    hideAdd: false,
  };

  createNewTab = targetKey => {
    const onEdit = this.props.onEdit;
    if (onEdit) {
      onEdit(targetKey, 'add');
    }
  };

  removeTab = (targetKey, e) => {
    e.stopPropagation();
    if (!targetKey) {
      return;
    }

    const onEdit = this.props.onEdit;
    if (onEdit) {
      onEdit(targetKey, 'remove');
    }
  };

  handleChange = activeKey => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(activeKey);
    }
  };

  render() {
    let {
      prefixCls,
      className = '',
      size,
      type = 'line',
      tabPosition,
      children,
      tabBarExtraContent,
      tabBarStyle,
      hideAdd,
      onTabClick,
      onPrevClick,
      onNextClick,
      animated = true,
    } = this.props;

    let { inkBarAnimated, tabPaneAnimated } =
      typeof animated === 'object'
        ? {
            inkBarAnimated: animated.inkBar,
            tabPaneAnimated: animated.tabPane,
          }
        : {
            inkBarAnimated: animated,
            tabPaneAnimated: animated,
          };

    // card tabs should not have animation
    if (type !== 'line') {
      tabPaneAnimated = 'animated' in this.props ? tabPaneAnimated : false;
    }

    const cls = cn(className, {
      'boldr-tabs-mini': size === 'small' || size === 'mini',
      'boldr-tabs-vertical': tabPosition === 'left' || tabPosition === 'right',
      'boldr-tabs-card': type.indexOf('card') >= 0,
      [`boldr-tabs-${type}`]: true,
      'boldr-tabs-no-animation': !tabPaneAnimated,
    });
    // only card type tabs can be added and closed
    let childrenWithClose;
    if (type === 'editable-card') {
      childrenWithClose = [];
      React.Children.forEach(children, (child: Node, index) => {
        let closable = child.props.closable;
        closable = typeof closable === 'undefined' ? true : closable;
        const closeIcon = closable ? (
          <Icon kind="close" onClick={e => this.removeTab(child.key, e)} />
        ) : null;
        childrenWithClose.push(
          React.cloneElement(child, {
            tab: (
              <div className={closable ? undefined : 'boldr-tabs-tab-unclosable'}>
                {child.props.tab}
                {closeIcon}
              </div>
            ),
            key: child.key || index,
          }),
        );
      });
      // Add new tab handler
      if (!hideAdd) {
        tabBarExtraContent = (
          <span>
            <Icon kind="plus" className="boldr-tabs-new-tab" onClick={this.createNewTab} />
            {tabBarExtraContent}
          </span>
        );
      }
    }

    tabBarExtraContent = tabBarExtraContent ? (
      <div className="boldr-tabs-extra-content">{tabBarExtraContent}</div>
    ) : null;

    const renderTabBar = () => (
      <ScrollableInkTabBar
        inkBarAnimated={inkBarAnimated}
        extraContent={tabBarExtraContent}
        onTabClick={onTabClick}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        style={tabBarStyle}
      />
    );

    return (
      <RcTabs
        {...this.props}
        className={cls}
        tabBarPosition={tabPosition}
        renderTabBar={renderTabBar}
        renderTabContent={() => <TabContent animated={tabPaneAnimated} animatedWithMargin />}
        onChange={this.handleChange}>
        {childrenWithClose || children}
      </RcTabs>
    );
  }
}
