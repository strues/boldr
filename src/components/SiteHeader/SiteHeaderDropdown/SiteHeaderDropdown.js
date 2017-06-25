/* @flow */
import React from 'react';
import classNames from 'classnames/bind';
import DropdownList from '../DropdownList';
import styles from './dropdown.scss';

const cx = classNames.bind(styles);

type Props = {
  data: Object,
  closeDropdowns: () => void,
  open: boolean,
};

const SiteHeaderDropdown = (props: Props) => {
  const { data, closeDropdowns, open } = props;
  return (
    <div
      className={cx('boldrui-sh__nav-dropdown', {
        'boldrui-sh__nav-dropdown-open': open,
      })}
      aria-hidden={open ? 'false' : 'true'}
    >
      <DropdownList key={data.id} data={data.children.items} closeDropdowns={closeDropdowns} />
    </div>
  );
};

SiteHeaderDropdown.defaultProps = {
  data: {},
};
export default SiteHeaderDropdown;
