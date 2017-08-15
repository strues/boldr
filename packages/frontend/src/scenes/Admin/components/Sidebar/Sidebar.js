/* eslint-disable react/no-unused-prop-types */
/* @flow */
import React, { Component } from 'react';
import withRouter from 'react-router-dom/withRouter';

import SidebarWrapper from './SidebarWrapper';
import SidebarHeader from './SidebarHeader';
import SidebarNav from './SidebarNav';

interface SidebarLink {
  icon: string,
  id: number,
  label: boolean,
  link: string,
  items: ?SidebarLinks,
}

export type SidebarLinks = Array<SidebarLink>;

export type Props = {
  navClassName: ?string,
  items: SidebarLinks,
  activeItem: string,
  // sidebar is hidden or visible? default visible
  isVisible: boolean,
  // expand or collapse menu item?
  isExpanded: boolean,
  isSmall: boolean,
  onExpandCollapse: () => void,
  // url for the logo image
  logoImg: string,
  // Where should the logo link to? Default is /
  logoLink: string,
};

class Sidebar extends Component {
  static defaultProps = {
    isPrimaryColor: true,
    sidebarDark: true,
    logoImg: 'https://boldr.io/assets/boldr-logo-white.png',
  };

  props: Props;

  render() {
    return (
      <SidebarWrapper {...this.props}>
        <SidebarHeader
          logoSrc={this.props.logoImg}
          logoLink={this.props.logoLink}
          isSmall={this.props.isSmall}
        />
        <SidebarNav
          items={this.props.items}
          activeItem={this.props.activeItem}
          isSmall={this.props.isSmall}
          navClassName={this.props.navClassName}
          isExpanded={this.props.isExpanded}
          onExpandCollapse={this.props.onExpandCollapse}
        />
      </SidebarWrapper>
    );
  }
}

export default withRouter(Sidebar);
