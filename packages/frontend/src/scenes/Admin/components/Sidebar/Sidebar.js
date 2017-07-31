/* @flow */
import React, { Component } from 'react';
import withRouter from 'react-router-dom/withRouter';

import SidebarWrapper from './SidebarWrapper';
import SidebarHeader from './SidebarHeader';
import SidebarNav from './SidebarNav';

export type SidebarLink = {
  icon: string,
  id: number,
  label: boolean,
  link: string,
  items: ?SidebarLinks,
};

export type SidebarLinks = Array<SidebarLink>;

export type Props = {
  navClassName: ?string,
  items: SidebarLinks,
  location: Object,
  isPrimaryColor: ?boolean,
  activeItem: ?string,
  // sidebar is hidden or visible? default visible
  visible: boolean,
  // expand or collapse menu item?
  expanded: boolean,
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
  state = {
    activate: null,
  };

  props: Props;

  render() {
    return (
      <SidebarWrapper {...this.props}>
        <SidebarHeader
          isPrimaryColor={this.props.isPrimaryColor}
          logoImg={this.props.logoImg}
          logoLink={this.props.logoLink}
        />
        <SidebarNav
          items={this.props.items}
          isPrimaryColor={this.props.isPrimaryColor}
          activeItem={this.props.activeItem}
          navClassName={this.props.navClassName}
          location={this.props.location}
          expanded={this.props.expanded}
          onExpandCollapse={this.props.onExpandCollapse}
        />
      </SidebarWrapper>
    );
  }
}

export default withRouter(Sidebar);
