import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './head.scss';

const cx = classNames.bind(styles);

const Head = (
  {
    toggleDropdownHandler,
    siteName,
    siteLogo,
    dropdownOpen,
    theme,
    closeHeaderDropdown,
  },
) => {
  return (
    <div
      className={cx('boldr-mainheader__head', ['theme-boldr'], {
        dropdownOpen,
      })}
    >
      <button
        type="button"
        className={cx('toggleButton', 'collapsed', { closeButton: dropdownOpen })}
        onClick={toggleDropdownHandler}
      >
        <span className="sr-only">Toggle navigation</span>
        <span className={cx('iconBar')} />
        <span className={cx('iconBar')} />
        <span className={cx('iconBar')} />
        <span className={cx('iconBar')} />
      </button>
      <div className={cx('boldr-mainheader__brand')}>
        <a href="/" rel="home" className={cx('boldr-mainheader__logo')} onClick={closeHeaderDropdown}>
          <img src="https://boldr.io/boldr.png" alt="logo" className={cx('boldr-mainheader__logo')} />
        </a>
      </div>
    </div>
  );
};

Head.propTypes = {
  toggleDropdownHandler: PropTypes.func,
  dropdownOpen: PropTypes.bool,
  theme: PropTypes.string,
  closeHeaderDropdown: PropTypes.func,
  siteName: PropTypes.string,
  siteLogo: PropTypes.string,
};

export default Head;
