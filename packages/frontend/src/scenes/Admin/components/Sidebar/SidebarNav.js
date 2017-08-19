/* eslint-disable react/no-unused-state */
/* @flow */

import React, { Component } from 'react';
import classnames from 'classnames';
import { StyleClasses } from '@boldr/ui';
import SidebarNavItem from './SidebarNavItem';
import { createItemTree, toggleExpandedItemWithId, activateItemWithLink } from './SidebarUtils';
import type { SidebarLinks } from './Sidebar';

const BASE_ELEMENT = StyleClasses.SIDEBAR_NAV;

export type Props = {
  navClassName?: string,
  items: SidebarLinks,
  activeItem: string,
  isExpanded: boolean,
  isSmall: boolean,
  onExpandCollapse: () => void,
};

interface State {
  items: SidebarLinks,
  activeItemLink: string,
}

class SidebarNav extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      items: props.items ? createItemTree(props.items) : [],
      activeItemLink: props.activeItem,
    };
  }
  state: State;

  componentWillReceiveProps(newProps: Object) {
    if (newProps && newProps.activeItem) {
      const items = activateItemWithLink(newProps.activeItem, this.props.items);
      this.setState({
        activeItemLink: newProps.activeItem,
        items,
      });
    }
  }

  props: Props;

  onItemClick = (id, items) => e => {
    // e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    this.toggleItem(id, items);
  };

  toggleItem = (id, items) => {
    if (this.props.onExpandCollapse) {
      this.props.onExpandCollapse();
    } else {
      toggleExpandedItemWithId(id, items);
    }
  };

  renderItems = () =>
    this.props.items.map(item =>
      <SidebarNavItem
        key={item.id}
        level={0}
        isExpanded={this.props.isExpanded}
        onExpandCollapse={this.toggleItem}
        activeItem={this.props.activeItem}
        isSmall={this.props.isSmall}
        onItemClick={this.onItemClick}
        {...item}
      />,
    );

  render() {
    const { navClassName } = this.props;
    const classes = classnames(BASE_ELEMENT, {
      'boldr-theme': !navClassName,
    });
    return (
      <div className={classes}>
        {this.renderItems()}
      </div>
    );
  }
}

export default SidebarNav;
