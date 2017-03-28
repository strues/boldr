/* @flow */
import React, { Component, PropTypes } from 'react';
import Button from 'react-md/lib/Buttons';
import classNames from 'classnames/bind';
import cxN from 'classnames';

import type { ReactChildren } from '../../../types/react';

import Head from '../Head';
import Detail from '../Detail';
import styles from './mainheader.scss';

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
};

type State = {
  navbarDropdownIsOpen: boolean,
  mobileState: boolean,
  focusable: ?boolean,
};

class MainHeader extends Component {
  static defaultProps = {
    className: '',
    children: null,
    theme: 'boldr',
    breakpoint: 992,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      navbarDropdownIsOpen: false,
      mobileState: true,
      focusable: true,
    };
  }
  state: State;
  componentDidMount() {
    /* eslint-env browser */
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  props: Props;
  setHeightDropdown = () => {
    const height = this.state.mobileState ? `${window.innerHeight - 75}px` : '';
    this.dropdownContent.style.height = height;
  };

  handleResize = () => {
    const mobileState = window.innerWidth < this.props.breakpoint;
    this.setState({ mobileState }, () => {
      this.addOverflowBody();
      this.setHeightDropdown();
    });
  };

  navbarDropdownHandler = () => {
    this.setState({ navbarDropdownIsOpen: !this.state.navbarDropdownIsOpen }, this.addOverflowBody);
  };

  closeDropdownOnButtonClick = callback =>
    event => {
      const isMobile = this.state.mobileState;
      const isDropdownOpen = this.state.navbarDropdownIsOpen;

      if (callback) callback(event);
      if (isMobile && isDropdownOpen) this.navbarDropdownHandler();
    };

  addOverflowBody() {
    const { navbarDropdownIsOpen, mobileState } = this.state;

    if (navbarDropdownIsOpen && mobileState) {
      // $FlowIssue
      document.body.classList.add(cx('overflow'));
    } else {
      // $FlowIssue
      document.body.classList.remove(cx('overflow'));
    }
  }

  handleKeyDown = e => {
    if (e.keyCode !== 9 || this.state.focusable) return;
    this.setState({ focusable: true });
  };

  render() {
    const {
      className,
      children,
      theme,
    } = this.props;
    const { navbarDropdownIsOpen, mobileState, focusable } = this.state;

    const actions = [];

    if (!this.props.auth.isAuthenticated) {
      actions.push(
        <Button key="login" raised primary label="Log In" href="/account/login" />,
        <Button key="signup" raised secondary label="Sign Up" href="/account/signup" />,
      );
    }
    if (this.props.me.roleId === 3) {
      actions.push(
        <Button key="dash" onClick={this.props.handleDashClick} icon primary tooltipLabel="Dashboard">
          dashboard
        </Button>,
      );
    }
    if (this.props.auth.isAuthenticated) {
      actions.push(
        <Button key="prof" href={`/profiles/${this.props.me.username}`} icon tooltipLabel="Profile">
          perm_identity
        </Button>,
        <Button key="logout" icon onClick={this.props.handleLogoutClick} tooltipLabel="Logout">
          exit_to_app
        </Button>,
      );
    }
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <header
        className={cx('boldr-mainheader', ['theme-boldr'], className, {
          'boldr-mainheader__dropdown-open': navbarDropdownIsOpen,
          focusable,
        })}
        onKeyDown={this.handleKeyDown}
      >
        <div className={cx('boldr-mainheader__menu', { 'boldr-mainheader__dropdown-open': navbarDropdownIsOpen })}>
          <div className="grid">
            <Head
              toggleDropdownHandler={this.navbarDropdownHandler}
              dropdownOpen={navbarDropdownIsOpen}
              theme={theme}
              siteName="Boldr"
              closeHeaderDropdown={this.closeDropdownOnButtonClick()}
            />
            <nav
              className={cx('boldr-mainheader__collapse', {
                'boldr-mainheader__dropdown-open': navbarDropdownIsOpen,
              })}
              ref={_ref => {
                // $FlowIssue
                this.dropdownContent = _ref;
              }}
              aria-label="Main menu"
            >
              <ul className={cx('boldr-mainheader__nav')} role="menubar">
                {this.props.menu.map(detail => (
                  <Detail
                    key={detail.uuid}
                    detail={detail}
                    theme="theme-boldr"
                    hasDropdown={detail.has_dropdown}
                    closeHeaderDropdown={this.closeDropdownOnButtonClick()}
                    moble={mobileState}
                  />
                ))}
              </ul>
            </nav>
            <div
              className={cxN(
                cx('buttons-group', {
                  'boldr-mainheader__dropdown-open': navbarDropdownIsOpen,
                }),
              )}
            >
              {actions}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default MainHeader;
