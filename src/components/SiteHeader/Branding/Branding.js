/* @flow */
import React from 'react';
import classNames from 'classnames/bind';
import Link from 'react-router-dom/Link';
import styles from './branding.scss';

const cx = classNames.bind(styles);

type Props = {
  toggleDropdownHandler: () => void,
  dropdownOpen: boolean,
  theme: ?string,
  closeHeaderDropdown: () => void,
  siteName: ?string,
  siteLogo: ?string,
};
const Branding = (props: Props) => {
  const { toggleDropdownHandler, siteName, siteLogo, dropdownOpen, closeHeaderDropdown } = props;
  return (
    <div
      className={cx('boldrui-sh__branding', ['theme-boldr'], {
        dropdownOpen,
      })}
    >
      <button
        type="button"
        className={cx('boldrui-sh__toggle', 'collapsed', {
          'boldrui-sh__close': dropdownOpen,
        })}
        onClick={toggleDropdownHandler}
      >
        <span className="sr-only">Toggle navigation</span>
        <span className={cx('boldrui-sh__menu-icon')} />
        <span className={cx('boldrui-sh__menu-icon')} />
        <span className={cx('boldrui-sh__menu-icon')} />
        <span className={cx('boldrui-sh__menu-icon')} />
      </button>
      <div className={cx('boldrui-sh__branding-brand')}>
        <Link
          to="/"
          rel="home"
          className={cx('boldrui-sh__branding-logo')}
          onClick={closeHeaderDropdown}
        >
          <img src={siteLogo.value} alt="logo" className={cx('boldrui-sh__branding-logo')} />
        </Link>
      </div>
    </div>
  );
};

Branding.defaultProps = {
  siteLogo: { value: '' },
  siteName: { value: '' },
};

export default Branding;
