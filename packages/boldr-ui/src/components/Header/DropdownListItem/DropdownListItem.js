import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import FontIcon from 'react-md/lib/FontIcons';
import styles from './dropdown-list-item.scss';

const cx = classNames.bind(styles);

class DropdownListItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    closeDropdowns: PropTypes.func,
  };

  render() {
    const { item, closeDropdowns } = this.props;

    return (
      <li className={cx('boldr-menu__dropdown-listitem')} role="menuitem">
        <a className="dropdown-link" href={item.href} onClick={closeDropdowns}>
          <FontIcon className={cx('dropdown-link__icon')} role="presentation" alt="">{item.icon}</FontIcon>
          <span className={cx('dropdown-link__text')}>
            {item.name}
          </span>
        </a>
      </li>
    );
  }
}

export default DropdownListItem;
