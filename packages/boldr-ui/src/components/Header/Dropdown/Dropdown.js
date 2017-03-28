/* @flow */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import DropdownList from '../DropdownList';
import styles from './dropdown.scss';

const cx = classNames.bind(styles);

type Props = {
  data: Object,
  closeDropdowns: () => void,
  open: boolean,
};

class Dropdown extends Component {
  static defaultProps = {
    data: {},
  };
  props: Props;
  render() {
    const { data, closeDropdowns, open } = this.props;

    return (
      <div
        className={cx('boldr-menu__dropdown', { 'boldr-menu__dropdown-open': open })}
        aria-hidden={open ? 'false' : 'true'}
      >
        <DropdownList key={data.id} data={data.children.items} closeDropdowns={closeDropdowns} />
      </div>
    );
  }
}

export default Dropdown;
