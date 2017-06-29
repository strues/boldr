/* @flow */
import React from 'react';
import styled from 'styled-components';
import cxN from 'classnames';
import NavLink from 'react-router-dom/NavLink';
import NavbarBrand from './NavbarBrand';
import NavbarMenu from './NavbarMenu';

export type Props = {
  children: ?ReactChildren,
  cssClassname: ?string,
  hasDropdown: ?boolean,
  href: string,
  icon: ?string,
  id: number,
  mobileHref: ?string,
  name: string,
  safeName: ?string,
  uuid: ?string,
  closeHeaderDropdown: ?Function,
  mobile: ?boolean,
};

class NavItem extends React.Component {
  state = {
    openDropdown: false,
  };
  handleDropdown = e => {
    const { openDropdown } = this.state;
    const { mobile } = this.props;
    const isMobile = mobile;
    const shouldOpenDropdown = !openDropdown;

    if (shouldOpenDropdown === openDropdown || isMobile) {
      return;
    }

    this.setState({ openDropdown: shouldOpenDropdown });
  };

  closeItemDropdown = () => {
    const isDesktop = !this.props.mobile;
    const isDropdownOpen = this.state.openDropdown;

    if (isDesktop && isDropdownOpen) {
      this.setState({ openDropdown: false });
    }
  };

  closeDropdowns = () => {
    this.closeItemDropdown();
    this.props.closeHeaderDropdown();
  };
  props: Props;
  render() {
    const {
      mobileHref,
      href,
      cssClassname,
      children,
      name,
      safeName,
      icon,
      hasDropdown,
    } = this.props;

    return (
      <li
        className="boldrui-navbar-item"
        onMouseEnter={this.handleDropdown}
        // onFocus={this.handleDropdown}
        onClick={this.handleDropdown}
        onKeyPress={this.handleDropdown}
      >
        {!hasDropdown
          ? <NavLink to={href} className={cxN('boldrui-siteheader__navitem--link')}>
              {safeName}
            </NavLink>
          : <NavbarMenu
              name={safeName}
              closeDropdowns={this.closeDropdowns}
              handleDropdown={this.handleDropdown}
              mobile={this.props.mobile}
              open={this.state.openDropdown}
              items={children.items}
            />}
      </li>
    );
  }
}

export default NavItem;
