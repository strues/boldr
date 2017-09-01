/* eslint-disable no-return-assign, react/no-unused-state, no-implicit-coercion */
// @flow
import React from 'react';
import type { Node } from 'react';
import Link from 'react-router-dom/Link';
import NavLink from 'react-router-dom/NavLink';

import {
  Icon,
  Container,
  Navbar,
  NavbarBrand,
  NavbarBurger,
  NavbarEnd,
  NavbarItem,
  NavbarMenu,
  NavbarStart,
} from '@boldr/ui';
import type { CurrentUser, SettingsType, RouterLocation } from '../../../../types/boldr';
import NavItem from './NavItem';

export type Props = {
  isMobile: boolean,
  auth: Object,
  loading: boolean,
  logout: Function,
  data?: Object,
  location: RouterLocation,
  menu: Object,
  settings?: SettingsType,
  currentUser: CurrentUser,
  logoImg?: string,
  breakpoint?: number,
  onLogout: Function,
  token?: string,
};

type State = {
  isActive: boolean,
  isDropdownOpen: boolean,
};

export const checkActiveLoc = (location: Object, url: string) => {
  return !!location.pathname.includes(url);
};

class Navigation extends React.Component<Props, State> {
  state: State = { isActive: false, isDropdownOpen: false };

  handleClickNav = () => {
    this.setState(state => ({ isActive: !state.isActive }));
  };

  onClickDropdown = () => {
    this.setState(state => ({ isDropdownOpen: !state.isDropdownOpen }));
  };
  onLogoutClick = () => {
    this.props.onLogout();
  };
  props: Props;
  render(): Node {
    const { menu: { details }, settings, currentUser, location, token } = this.props;
    const { isActive } = this.state;
    return (
      <Navbar
        ref={el => {
          (this: any).navbar = el;
        }}>
        <Container>
          <NavbarBrand>
            <NavbarItem>
              <Link to="/">
                <img
                  className="boldr-logo-img"
                  alt="logo image"
                  src="https://boldr.io/assets/boldr-logo-light.png"
                />
              </Link>
            </NavbarItem>
            <NavbarBurger isActive={isActive} onClick={this.handleClickNav} />
          </NavbarBrand>
          <NavbarMenu isActive={isActive} onClick={this.handleClickNav}>
            <NavbarStart>
              {details.map(detail => (
                <NavItem
                  key={detail.id}
                  isActive={checkActiveLoc(location, detail.href)}
                  {...detail}
                />
              ))}
            </NavbarStart>
            <NavbarEnd>
              {token &&
              parseInt(currentUser.roleId, 10) === 3 && (
                <NavbarItem>
                  <NavLink to="/admin">
                    <Icon kind="dashboard" color="#afbbca" />
                  </NavLink>
                </NavbarItem>
              )}
              {!token && (
                <NavbarItem>
                  <NavLink to="/login">Login</NavLink>
                </NavbarItem>
              )}
              {token && (
                <NavbarItem>
                  <NavLink to={`/profiles/${currentUser.username}`}>
                    <Icon kind="account-card" color="#afbbca" />
                  </NavLink>
                </NavbarItem>
              )}
              {token && (
                <NavbarItem>
                  <Icon kind="logout" onClick={this.onLogoutClick} color="#afbbca" />
                </NavbarItem>
              )}
              {!token && (
                <NavbarItem href="/signup" title="Signup">
                  Signup
                </NavbarItem>
              )}
            </NavbarEnd>
          </NavbarMenu>
        </Container>
      </Navbar>
    );
  }
}

export default Navigation;
