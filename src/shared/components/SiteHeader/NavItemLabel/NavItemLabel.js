/* @flow */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import type { ReactChildren } from '../../../types/react';
import SiteHeaderDropdown from '../SiteHeaderDropdown';
import styles from '../NavItem/navitem.scss';

const cx = classNames.bind(styles);
type Props = {
  name: string,
  children: ReactChildren,
};

const NavItemLabel = (props: Props) => {
  const { name, children } = props;
  return (
    <span>
      <span className={cx('boldrui-sh__navitem-text')}>{name}</span>
      {children
        ? <svg
            width="8"
            height="4"
            viewBox="62 7 10 6"
            className={cx('boldrui-sh__navitem-caret')}
          >
            <path
              // eslint-disable-next-line max-len
              d="M71.884 7.698l-4.56 5.116c-.013.022-.008.05-.026.07-.083.084-.192.12-.3.116-.106.004-.214-.033-.295-.117-.02-.02-.014-.047-.028-.068L62.115 7.7c-.154-.16-.154-.42 0-.58.156-.16.408-.16.563 0L67 11.97l4.322-4.85c.155-.16.406-.16.56 0 .157.16.157.418.002.578z"
              fill="#000"
            />
          </svg>
        : null}
    </span>
  );
};

export default NavItemLabel;
