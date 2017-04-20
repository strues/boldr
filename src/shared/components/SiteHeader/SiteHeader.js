/* @flow */
import React, { Component } from 'react';
import { Button, Grid } from 'boldr-ui';
import classNames from 'classnames/bind';
import cxN from 'classnames';
import Link from 'react-router-dom/Link';
import type { ReactChildren } from '../../types/react';

import Branding from './Branding';
import NavItem from './NavItem';
import styles from './siteheader.scss';

const cx = classNames.bind(styles);

type Props = {
  className: string,
  children: ?ReactChildren,
  theme: string,
  breakpoint: number,
  navigate: () => void,
  actions: Object,
  menu: Object,
  settings: Object,
  logo: Object,
  boldr: Object,
  auth: Object,
  me: Object,
  handleLogoClick: () => void,
  handleLogoutClick: () => void,
  handleDashClick: () => void,
  dropdownContent: any,
};

type State = {
  dropdownIsOpen: boolean,
  isMobile: boolean,
  focusable: ?boolean,
};

class SiteHeader extends Component {
  static defaultProps = {
    className: '',
    children: null,
    theme: 'boldr',
    breakpoint: 992,
  };
  state = {
    dropdownIsOpen: false,
    isMobile: false,
    focusable: true,
  };

  state: State;

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  props: Props;
  setHeightDropdown = () => {
    const height = this.state.isMobile ? `${window.innerHeight - 75}px` : '';
    this.dropdownContent.style.height = height;
  };

  handleResize = () => {
    const isMobile = window.innerWidth < this.props.breakpoint;
    this.setState({ isMobile }, () => {
      this.addOverflowBody();
      this.setHeightDropdown();
    });
  };

  handleDropdown = () => {
    this.setState(
      { dropdownIsOpen: !this.state.dropdownIsOpen },
      this.addOverflowBody,
    );
  };

  closeDropdownOnButtonClick = callback => event => {
    const { isMobile } = this.state;
    const isDropdownOpen = this.state.dropdownIsOpen;

    if (callback) {
      callback(event);
    }
    if (isMobile && isDropdownOpen) {
      this.handleDropdown();
    }
  };

  addOverflowBody() {
    const { dropdownIsOpen, isMobile } = this.state;

    if (dropdownIsOpen && isMobile) {
      // $FlowIssue
      document.body.classList.add(cx('overflow'));
    } else {
      // $FlowIssue
      document.body.classList.remove(cx('overflow'));
    }
  }

  handleKeyDown = e => {
    if (e.keyCode !== 9 || this.state.focusable) {
      return;
    }
    this.setState({ focusable: true });
  };

  render() {
    const { className, children, theme, auth, me, menu } = this.props;
    const { dropdownIsOpen, isMobile, focusable } = this.state;

    const menuElements = [];
    if (!auth.isAuthenticated) {
      menuElements.push(
        <Link key="login" to="/account/login">
          <Button raised primary label="Log In" />
        </Link>,
        <Link key="signup" to="/account/signup">
          <Button raised secondary label="Sign Up" />
        </Link>,
      );
    }
    if (me.roleId === 3) {
      menuElements.push(
        <Link key="dash" to="/admin">
          <Button icon primary tooltipLabel="Dashboard">
            dashboard
          </Button>
        </Link>,
      );
    }
    if (auth.isAuthenticated) {
      menuElements.push(
        <Link key="prof" to={`/profiles/${me.username}`}>
          <Button icon tooltipLabel="Profile">
            perm_identity
          </Button>
        </Link>,
        <Button
          key="logout"
          icon
          onClick={this.props.handleLogoutClick}
          tooltipLabel="Logout"
        >
          exit_to_app
        </Button>,
      );
    }

    return (
      <header
        className={cx('boldrui-siteheader', ['theme-boldr'], className, {
          'boldrui-sh__dropdown-open': dropdownIsOpen,
          focusable,
        })}
        onKeyDown={this.handleKeyDown}
      >
        <Grid>
          <div
            className={cx('boldrui-sh__menu', {
              'boldrui-sh__dropdown-open': dropdownIsOpen,
            })}
          >
            <Branding
              toggleDropdownHandler={this.handleDropdown}
              dropdownOpen={dropdownIsOpen}
              theme={theme}
              siteName="Boldr"
              closeHeaderDropdown={this.closeDropdownOnButtonClick()}
            />
            <nav
              className={cx('boldrui-sh__collapse', {
                'boldrui-sh__dropdown-open': dropdownIsOpen,
              })}
              ref={_ref => {
                (this: any).dropdownContent = _ref;
              }}
              aria-label="Main menu"
            >
              <ul className={cx('boldrui-sh__nav')} role="menubar">
                {menu.map(detail => (
                  <NavItem
                    key={detail.uuid}
                    detail={detail}
                    theme="theme-boldr"
                    hasDropdown={detail.has_dropdown}
                    closeHeaderDropdown={this.closeDropdownOnButtonClick()}
                    moble={isMobile}
                  />
                ))}
              </ul>
            </nav>
            <div
              className={cxN(
                cx('boldrui-sh__menu-right', {
                  'boldrui-sh__dropdown-open': dropdownIsOpen,
                }),
              )}
            >
              {menuElements}
            </div>
          </div>
        </Grid>
      </header>
    );
  }
}

export default SiteHeader;
