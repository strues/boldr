/* @flow */
import React, { Component } from 'react';
import Icon from '@boldr/ui/Icons/Icon';
import Link from 'react-router-dom/Link';
import NavLink from 'react-router-dom/NavLink';
import Container from '@boldr/ui/Layout/Container';
import {
  Navbar,
  NavbarBrand,
  NavbarBurger,
  NavbarDivider,
  NavbarDropdown,
  NavbarEnd,
  NavbarItem,
  NavbarLink,
  NavbarMenu,
  NavbarStart,
} from '@boldr/ui/Navbar';
// internal
import NavItem from './NavItem';

export type Props = {
  me: ?User,
  isMobile: boolean,
  auth: Object,
  showHeader: () => void,
  loading: boolean,
  logout: Function,
  data?: Object,
  location: Object,
  menu: Object,
  settings?: Array<Setting>,
  currentUser: User,
  logoImg: ?string,
  breakpoint: ?number,
  onLogout: Function,
};
export const isActive = (location: Object, url: string) => {
  return !!location.pathname.includes(url);
};
class Navigation extends Component {
  state = { isActive: false, isDropdownOpen: false };

  onClickNav = () => {
    this.setState(state => ({ isActive: !state.isActive }));
  };

  onClickDropdown = () => {
    this.setState(state => ({ isDropdownOpen: !state.isDropdownOpen }));
  };
  onLogoutClick = () => {
    this.props.onLogout();
  };
  props: Props;
  render() {
    const { menu: { details }, settings, currentUser, onLogout, location, auth } = this.props;
    return (
      <Navbar>
        <Container>
          <NavbarBrand>
            <NavbarItem>
              <Link to="/">
                <img src="https://boldr.io/assets/boldr-blue-logo.png" />
              </Link>
            </NavbarItem>
            <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} />
          </NavbarBrand>
          <NavbarMenu isActive={this.state.isActive} onClick={this.onClickNav}>
            <NavbarStart>
              {details.map(detail =>
                <NavItem key={detail.id} isActive={isActive(location, detail.href)} {...detail} />,
              )}
            </NavbarStart>
            <NavbarEnd>
              {!!auth.token &&
                currentUser.roleId === 3 &&
                <NavbarItem>
                  <NavLink to="/admin">
                    <Icon kind="dashboard" />
                  </NavLink>
                </NavbarItem>}
              {!auth.token &&
                <NavbarItem>
                  <NavLink to="/login">Login</NavLink>
                </NavbarItem>}
              {auth.token &&
                <NavbarItem>
                  <NavLink to={`/profiles/${currentUser.username}`}>
                    <Icon kind="account-card" />
                  </NavLink>
                </NavbarItem>}
              {auth.token &&
                <NavbarItem>
                  <Icon kind="logout" onClick={this.onLogoutClick} />
                </NavbarItem>}
              {!auth.token &&
                <NavbarItem href="/signup" title="Signup">
                  Signup
                </NavbarItem>}
            </NavbarEnd>
          </NavbarMenu>
        </Container>
      </Navbar>
    );
  }
}

export default Navigation;
