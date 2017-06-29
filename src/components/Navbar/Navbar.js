/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import NavLink from 'react-router-dom/NavLink';
import NavbarBrand from './NavbarBrand';
import NavItem from './NavItem';

export type Props = {
  isFixed: boolean,
  menu: Object,
  settings: Array<Setting>,
  currentUser: User,
  breakpoint: ?number,
  handleLogoutClick: Function,
  auth: Object,
};

class Navbar extends Component {
  static defaultProps = {
    isFixed: true,
    breakpoint: 992,
  };
  state = {
    open: false,
    isMobile: false,
    focusable: true,
  };
  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const isMobile = window.innerWidth < this.props.breakpoint;
    this.setState({ isMobile }, () => {
      this.addOverflowBody();
    });
  };

  handleDropdown = () => {
    this.setState({ open: !this.state.open }, this.addOverflowBody);
  };

  closeDropdownOnButtonClick = callback => event => {
    const { isMobile } = this.state;
    const isDropdownOpen = this.state.open;

    if (callback) {
      callback(event);
    }
    if (isMobile && isDropdownOpen) {
      this.handleDropdown();
    }
  };

  addOverflowBody() {
    const { open, isMobile } = this.state;

    if (open && isMobile) {
      // $FlowIssue
      return document.body.classList.add(cx('overflow'));
    }

    document.body.classList.remove(cx('overflow'));
  }

  handleKeyDown = e => {
    if (e.keyCode !== 9 || this.state.focusable) {
      return;
    }
    this.setState({ focusable: true });
  };

  props: Props;
  render() {
    const { isFixed, menu: { details }, settings, currentUser } = this.props;
    const navbarClassName = cx({
      'boldrui-navbar-fixed': isFixed,
      'boldrui-navbar-static': !isFixed,
    });
    return (
      <header id="boldrui-navbar" className={navbarClassName}>
        <input
          type="checkbox"
          id="boldrui-navbar-checkbox"
          className="boldrui-navbar-checkbox"
          value="on"
        />
        <div
          id="boldrui-navbar-menu"
          className="boldrui-navbar-menu-right boldrui-navbar-menu boldrui-navbar-menu-material-indigo"
          ref={_ref => {
            (this: any).dropdownContent = _ref;
          }}
        >
          <ul className="boldrui-navbar-navigation">
            <NavbarBrand settings={settings} />
            {details.map(detail =>
              <NavItem
                key={detail.uuid}
                closeHeaderDropdown={this.closeDropdownOnButtonClick()}
                mobile={this.state.isMobile}
                {...detail}
              />,
            )}
            <li className="boldrui-navbar-item">
              {this.props.auth.token
                ? <NavLink to="/admin">Dashboard</NavLink>
                : <NavLink to="/login">Login</NavLink>}
            </li>
            {this.props.auth.token
              ? <li className="boldrui-navbar-item">
                  <NavLink to={`/profiles/${currentUser.username}`}>Profile</NavLink>
                </li>
              : null}
            <li className="boldrui-navbar-item">
              {this.props.auth.token
                ? <a
                    onClick={this.props.handleLogoutClick}
                    onKeyPress={this.props.handleLogoutClick}
                  >
                    Logout
                  </a>
                : <NavLink to="/signup">Signup</NavLink>}
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

export default Navbar;
