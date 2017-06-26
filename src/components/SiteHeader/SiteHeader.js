/* @flow */
import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import cxN from 'classnames';
import Link from 'react-router-dom/Link';
import { mediaQuery } from '../../theme/theme';
import Button from '../Button';
import Grid from '../Layout/Grid';
import Icon from '../Icons';
import Branding from './Branding';
import NavItem from './NavItem';
import styles from './siteheader.scss';

const cx = classNames.bind(styles);

const Container = styled.div`
  margin: 0 auto;
  width: auto;
  ${mediaQuery.large`width: 71rem;`}
  ${mediaQuery.medium`width: 61rem;`}
  ${mediaQuery.small`width: 46rem;`}
`;

type Props = {
  className: string,
  children: ?ReactChildren,
  theme: string,
  breakpoint: number,
  navigate: () => void,
  actions: Object,
  menu: Object,
  settings: Array<Object>,
  logo: Object,
  boldr: Object,
  auth: Object,
  me: Object,
  details: Array<Object>,
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
    this.setState({ dropdownIsOpen: !this.state.dropdownIsOpen }, this.addOverflowBody);
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
      <ul className={cx('boldrui-sh__nav')}>
        {this.props.details.map(detail =>
          <NavItem
            key={detail.uuid}
            detail={detail}
            theme="theme-boldr"
            hasDropdown={detail.hasDropdown}
            closeHeaderDropdown={this.closeDropdownOnButtonClick()}
            moble={this.state.isMobile}
          />,
        )}
      </ul>
    );
  }
  renderAuthDependent() {
    const menuElements = [];
    if (!this.props.auth.isAuthenticated) {
      menuElements.push(
        <Link key="login" to="/login">
          <Button kind="primary" outline>Log In</Button>
        </Link>,
        <Link key="signup" to="/signup">
          <Button kind="secondary">Signup</Button>
        </Link>,
      );
    }
    if (this.props.me.roleId === 3) {
      menuElements.push(
        <Link key="dash" to="/admin">
          <IconButton>
            <Icon kind="dashboard" color="#2d343c" />
          </IconButton>
        </Link>,
      );
    }
    if (this.props.auth.isAuthenticated) {
      menuElements.push(
        <Link key="prof" to={`/profiles/${this.props.me.username}`}>
          <IconButton>
            <Icon kind="account" color="#2d343c" />
          </IconButton>
        </Link>,
        <IconButton key="logo">
          <Icon key="logout" kind="logout" color="#2d343c" onClick={this.props.handleLogoutClick} />
        </IconButton>,
      );
    }
    return menuElements;
  }

  render() {
    const { className, theme, settings } = this.props;
    const { dropdownIsOpen, focusable } = this.state;

    return (
      <header className={cx('boldrui-siteheader', ['theme-boldr'], className)}>

        <div
          className={cx('boldrui-sh__menu', {
            'boldrui-sh__dropdown-open': dropdownIsOpen,
          })}
        >
          <Grid>
            <Branding
              toggleDropdownHandler={this.handleDropdown}
              dropdownOpen={dropdownIsOpen}
              theme={theme}
              siteName="boldr"
              siteLogo="https://boldr.io/assets/boldr-logo-white.png"
              closeHeaderDropdown={this.closeDropdownOnButtonClick()}
            />
            <div
              className={cx('boldrui-sh__collapse', {
                'boldrui-sh__dropdown-open': dropdownIsOpen,
              })}
              ref={_ref => {
                (this: any).dropdownContent = _ref;
              }}
            >
              <nav className={cx('boldrui-sh__navmain')} role="navigation" aria-label="Main menu">
                {this.renderMenuItems()}
              </nav>
            </div>
            <div className={cxN(cx('boldrui-sh__menu-right'))}>
              {this.renderAuthDependent()}
            </div>
          </Grid>
        </div>

      </header>
    );
  }
}

export default SiteHeader;