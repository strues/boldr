import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import DropdownListItem from '../DropdownListItem';
import styles from './dropdown-list.scss';

const cx = classNames.bind(styles);

const DropdownList = ({ data, parentClass, closeDropdowns }) =>
  <div className={ cx('boldr-menu__dropdown-list') }>
    <ul role="menubar" aria-hidden="false">
      {
          data.map(item =>
          <DropdownListItem
            key={ item.id }
            item={ item }
            parentClass={ null }
            closeDropdowns={ closeDropdowns }
          />,
        )
      }
    </ul>
  </div>;

DropdownList.propTypes = {
  data: PropTypes.array,
  parentClass: PropTypes.string,
  closeDropdowns: PropTypes.func,
};

export default DropdownList;
