/* @flow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { StyleClasses, BOLDR_NS } from '../../theme/styleClasses';
import type { ReactChildren, ReactElement } from '../../types/react.js.flow';
import SidebarNavItem from './SidebarNavItem';
import {
  createItemTree,
  toggleExpandedItemWithId,
  expandParent,
  activateItemWithLink,
} from './SidebarUtils';
import type { SidebarLink, SidebarLinks } from './Sidebar';

const BASE_ELEMENT = StyleClasses.SIDEBAR_NAV;
type Props = {
  navClassName: ?string,
  items: SidebarLinks,
  isPrimaryColor: ?boolean,
  match: ?Object,
  activeItem: ?string,
  location: Object,
  expanded: boolean,
  onExpandCollapse: () => void,
};

class SidebarNav extends Component {
  state = {
    items: [],
    activeItemLink: null,
  };

  // Create Item tree with additional properties
  componentWillMount() {
    const items = this.props.items ? createItemTree(this.props.items) : [];
    this.setState({
      items,
      activeItemLink: this.props.location,
    });
  }

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
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    this.toggleItem(id, items);
  };
  toggleItem = (id, items) => {
    if (this.props.onExpandCollapse) {
      this.props.onExpandCollapse();
    }
    toggleExpandedItemWithId(id, items);
  };

  renderItems = () =>
    this.props.items.map(item => (
      <SidebarNavItem
        key={item.id}
        level={0}
        expanded={this.props.expanded}
        onExpandCollapse={this.props.onExpandCollapse}
        activeItem={this.props.activeItem}
        onItemClick={this.onItemClick}
        location={this.props.location}
        match={this.props.match}
        {...item}
      />
    ));

  render() {
    const { navClassName } = this.props;
    const classes = classnames(BASE_ELEMENT, {
      'boldr-theme': !this.props.navClassName,
    });
    return (
      <div className={classes}>
        {this.renderItems()}
      </div>
    );
  }
}

export default SidebarNav;
