import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import Dropdown from '../Dropdown';
import styles from './detail.scss';

const cx = classNames.bind(styles);

class Detail extends Component {
  static propTypes = {
    detail: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      mobileHref: PropTypes.string,
      dropdownClass: PropTypes.string,
      hasDropdown: PropTypes.bool,
      children: PropTypes.object,
    }),
    hasDropdown: PropTypes.bool,
    closeHeaderDropdown: PropTypes.func,
    mobile: PropTypes.bool,
  };

  state = {
    openDropdown: false,
  };

  handleDropdown = e => {
    const { openDropdown } = this.state;
    const { mobile } = this.props;
    const isMobile = mobile;
    const shouldOpenDropdown = ['mouseenter', 'focus'].indexOf(e.type) > -1;

    if (shouldOpenDropdown === openDropdown || isMobile) return;

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

    const linkContent = <DetailContent name={detail.name} children={detail.children} theme="theme-boldr" />;
    const linkHref = (mobile ? detail.mobile_href : null) || detail.href;

    return (
      <li
        className={cx('boldr-menudetail', [`detail-${detail.id}`], ['theme-boldr'], {
          'boldr-menudetail__dropdown': hasDropdown,
          'boldr-menudetail__dropdown-open': this.state.openDropdown,
        })}
        onMouseEnter={this.handleDropdown}
        onFocus={this.handleDropdown}
        onMouseLeave={this.handleDropdown}
        onBlur={this.handleDropdown}
        role="menuitem"
        aria-haspopup="true"
      >
        {linkHref
          ? <a href={`/${linkHref}`} onClick={this.closeDropdowns} className={cx('boldr-menudetail__link')}>
              {linkContent}
            </a>
          : <span tabIndex="0" className={cx('boldr-menudetail__link')}>{linkContent}</span>}
        {detail.children
          ? <Dropdown data={detail} closeDropdowns={this.closeDropdowns} open={this.state.openDropdown} />
          : null}

      </li>
    );
  }
}

export default Detail;

const DetailContent = ({ name, children }) => (
  <span>
    <span className={cx('boldr-menudetail__text')}>{name}</span>
    {children
      ? <svg width="8" height="4" viewBox="62 7 10 6" className={cx('boldr-menudetail__caret')}>
          <path
            // eslint-disable-next-line max-len
            d="M71.884 7.698l-4.56 5.116c-.013.022-.008.05-.026.07-.083.084-.192.12-.3.116-.106.004-.214-.033-.295-.117-.02-.02-.014-.047-.028-.068L62.115 7.7c-.154-.16-.154-.42 0-.58.156-.16.408-.16.563 0L67 11.97l4.322-4.85c.155-.16.406-.16.56 0 .157.16.157.418.002.578z"
            fill="#000"
          />
        </svg>
      : null}
  </span>
);

DetailContent.propTypes = {
  name: PropTypes.string,
  theme: PropTypes.string,
  children: PropTypes.any,
};
