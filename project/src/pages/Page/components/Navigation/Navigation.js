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
  NavbarDropdown,
  NavbarLink,
  NavbarItem,
  NavbarMenu,
  NavbarStart,
} from '@boldr/ui';
import type { CurrentUser, SettingsType, RouterLocation, MenuType } from '../../../../types/boldr';

export type Props = {
  location: RouterLocation,
  menu: MenuType,
  settings?: SettingsType,
  currentUser: CurrentUser,
  onLogout: Function,
  token?: string,
};

type State = {
  isActive: boolean,
  isDropdownOpen: boolean,
};

class Navigation extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = { isActive: false, isDropdownOpen: false };
    this.handleClickNav = this.handleClickNav.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onClickDropdown = this.onClickDropdown.bind(this);
  }

  handleClickNav() {
    this.setState({ isActive: !this.state.isActive });
  }

  onClickDropdown() {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  }
  onLogoutClick() {
    this.props.onLogout();
  }

  props: Props;
  render(): Node {
    const { menu: { details }, currentUser, location, token } = this.props;
    const { isActive } = this.state;
    const dropdownItems = details.filter(detail => detail.parentId !== null);
    return (
      <Navbar>
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
              {details.map(detail => {
                if (!detail.hasDropdown && !detail.isDropdown) {
                  return (
                    <NavbarItem
                      key={detail.id}
                      render={() => (
                        <NavLink
                          className="boldr-navbar__item"
                          activeClassName="is-active"
                          to={detail.href}>
                          {detail.title}
                        </NavLink>
                      )}
                    />
                  );
                } else if (detail.hasDropdown) {
                  return (
                    <NavbarItem key={detail.id} hasDropdown isHoverable>
                      <NavbarLink
                        className="boldr-navbar__item"
                        key={detail.id}
                        render={() => (
                          <NavLink className="boldr-navbar__link" to={detail.href}>
                            {detail.title}
                          </NavLink>
                        )}
                      />
                      <NavbarDropdown>
                        {dropdownItems.map(d => {
                          return (
                            <NavbarItem
                              key={d.id}
                              title={d.safeName}
                              render={() => (
                                <NavLink
                                  className="boldr-navbar__item"
                                  activeClassName="is-active"
                                  to={d.href}>
                                  {d.safeName}
                                </NavLink>
                              )}
                            />
                          );
                        })}
                      </NavbarDropdown>
                    </NavbarItem>
                  );
                }
              })}
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
