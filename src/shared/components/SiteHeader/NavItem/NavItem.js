/* @flow */
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import NavLink from 'react-router-dom/NavLink';
import NavItemLabel from '../NavItemLabel';
import SiteHeaderDropdown from '../SiteHeaderDropdown';
import styles from './navitem.scss';

const cx = classNames.bind(styles);
type Props = {
  detail: MenuDetails,
  hasDropdown: boolean,
  closeHeaderDropdown: () => void,
  mobile: boolean,
};
class NavItem extends Component {
  state = {
    openDropdown: false,
  };
  props: Props;
  handleDropdown = e => {
    const { openDropdown } = this.state;
    const { mobile } = this.props;
    const isMobile = mobile;
    const shouldOpenDropdown = ['mouseenter', 'focus'].indexOf(e.type) > -1;

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

  render() {
    const { detail, hasDropdown, mobile } = this.props;

    const linkContent = (
      <NavItemLabel
        name={detail.name}
        children={detail.children}
        theme="theme-boldr"
      />
    );
    const linkHref = (mobile ? detail.mobileHref : null) || detail.href;

    return (
      <li
        className={cx(
          'boldrui-sh__navitem',
          [`item__${detail.id}`],
          ['theme-boldr'],
          {
            'boldr-menudetail__dropdown': hasDropdown,
            'boldr-menudetail__dropdown-open': this.state.openDropdown,
          },
        )}
        onMouseEnter={this.handleDropdown}
        onFocus={this.handleDropdown}
        onMouseLeave={this.handleDropdown}
        onBlur={this.handleDropdown}
        role="menuitem"
        aria-haspopup="true"
      >
        {linkHref
          ? <NavLink
              to={`/${linkHref}`}
              onClick={this.closeDropdowns}
              className={cx('boldrui-sh__navitem-link')}
            >
              {linkContent}
            </NavLink>
          : <span tabIndex="0" className={cx('boldrui-sh__navitem-link')}>
              {linkContent}
            </span>}
        {detail.children
          ? <SiteHeaderDropdown
              data={detail}
              closeDropdowns={this.closeDropdowns}
              open={this.state.openDropdown}
            />
          : null}

      </li>
    );
  }
}

export default NavItem;
