/* @flow */
import * as React from 'react';
import NavLink from 'react-router-dom/NavLink';
import Link from 'react-router-dom/Link';

import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarBurger,
  NavbarEnd,
  NavbarItem,
  NavbarMenu,
  NavbarStart,
  NavbarLink,
} from '@boldr/ui';

export type Props = {
  currentUser: Object,
  location: Object,
  match: Object,
  ui: Object,
  dispatch: Function,
};

type State = {
  isDropdownOpen: boolean,
  isActive: boolean,
};

// @todo: handle import like other universal pages
export const checkActiveLoc = (location: Object, url: string) => {
  return !!location.pathname.includes(url);
};

export class Navigation extends React.Component<Props, *> {
  state: State = { isActive: false, isDropdownOpen: false };

  props: Props;

  onClickNav = () => {
    this.setState(state => ({ isActive: !state.isActive }));
  };

  onClickDropdown = () => {
    this.setState(state => ({ isDropdownOpen: !state.isDropdownOpen }));
  };

  render() {
    const { isActive } = this.state;
    // const { currentUser } = this.props;

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
            <NavbarBurger isActive={isActive} onClick={this.onClickNav} />
          </NavbarBrand>
          <NavbarMenu isActive={isActive} onClick={this.onClickNav}>
            <NavbarStart>
              <NavbarItem>
                <NavbarLink
                  isActive={isActive}
                  render={() => (
                    <NavLink title="home" to="/">
                      Home
                    </NavLink>
                  )}
                />
              </NavbarItem>
              <NavbarItem isActive={isActive} href="/admin" title="Dashboard">
                <NavbarLink
                  isActive={isActive}
                  render={() => <NavLink to="/admin">Dashboard</NavLink>}
                />
              </NavbarItem>
            </NavbarStart>
            <NavbarEnd>
              <NavbarItem isActive={isActive} title="Articles">
                <NavbarLink
                  isActive={isActive}
                  render={() => <NavLink to="/admin/articles">Articles</NavLink>}
                />
              </NavbarItem>
              <NavbarItem isActive={isActive} title="New Article">
                <NavbarLink
                  isActive={isActive}
                  render={() => <NavLink to="/admin/articles/new">New Article</NavLink>}
                />
              </NavbarItem>
              <NavbarItem isActive={isActive} title="Content">
                <NavbarLink
                  isActive={isActive}
                  render={() => <NavLink to="/admin/content">Content</NavLink>}
                />
              </NavbarItem>
              <NavbarItem isActive={isActive} title="Tags">
                <NavbarLink
                  isActive={isActive}
                  render={() => <NavLink to="/admin/tags">Tags</NavLink>}
                />
              </NavbarItem>
              <NavbarItem isActive={isActive} title="Media">
                <NavbarLink
                  isActive={isActive}
                  render={() => <NavLink to="/admin/media">Media Gallery</NavLink>}
                />
              </NavbarItem>
              <NavbarItem isActive={isActive} title="Upload">
                <NavbarLink
                  isActive={isActive}
                  render={() => <NavLink to="/admin/media/upload">Upload</NavLink>}
                />
              </NavbarItem>
              <NavbarItem isActive={isActive} title="Settings">
                <NavbarLink
                  isActive={isActive}
                  render={() => <NavLink to="/admin/settings">Settings</NavLink>}
                />
              </NavbarItem>
              <NavbarItem isActive={isActive} title="Members">
                <NavbarLink
                  isActive={isActive}
                  render={() => <NavLink to="/admin/members">Members</NavLink>}
                />
              </NavbarItem>
            </NavbarEnd>
          </NavbarMenu>
        </Container>
      </Navbar>
    );
  }
}

export default Navigation;
