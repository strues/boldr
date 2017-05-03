/* @flow */
import React, { Component } from 'react';
import Button from 'boldr-ui/lib/components/Button';
import Grid from 'boldr-ui/lib/components/Layout/Grid';
import Icon from 'boldr-ui/lib/components/Icons';
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
  siteName: Object,
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
    menu: [],
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

  renderMenuItems() {
    return (
      <ul className={cx('boldrui-sh__nav')} role="menubar">
        {this.props.menu.map(detail => (
          <NavItem
            key={detail.uuid}
            detail={detail}
            theme="theme-boldr"
            hasDropdown={detail.hasDropdown}
            closeHeaderDropdown={this.closeDropdownOnButtonClick()}
            moble={this.state.isMobile}
          />
        ))}
      </ul>
    );
  }
  renderAuthDependent() {
    const menuElements = [];
    if (!this.props.auth.isAuthenticated) {
      menuElements.push(
        <Link key="login" to="/account/login">
          <Button>Log In</Button>
        </Link>,
        <Link key="signup" to="/account/signup">
          <Button theme="secondary">Signup</Button>
        </Link>,
      );
    }
    if (this.props.me.roleId === 3) {
      menuElements.push(
        <Link key="dash" to="/admin">
          <Icon kind="dashboard" color="#333" />
        </Link>,
      );
    }
    if (this.props.auth.isAuthenticated) {
      menuElements.push(
        <Link key="prof" to={`/profiles/${this.props.me.username}`}>
          <Icon kind="account" color="#333" />
        </Link>,
        <Icon
          key="logout"
          kind="logout"
          color="#333"
          onClick={this.props.handleLogoutClick}
        />,
      );
    }
    return menuElements;
  }

  render() {
    const { className, theme, logo, siteName } = this.props;
    const { dropdownIsOpen, focusable } = this.state;
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
              siteName={siteName}
              siteLogo={logo}
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
              {this.renderMenuItems()}
            </nav>
            <div className={cxN(cx('boldrui-sh__menu-right'))}>
              {this.renderAuthDependent()}
            </div>
          </div>
        </Grid>
      </header>
    );
  }
}

export default SiteHeader;
