/* @flow */
import React from 'react';
import classNames from 'classnames/bind';
import DropdownListItem from '../DropdownListItem';
import styles from './dropdown-list.scss';

type Props = {
  data: Array<Object>,
  parentClass: string,
  closeDropdowns: () => void,
};

const cx = classNames.bind(styles);

const DropdownList = (props: Props) => (
  <div className={cx('boldr-menu__dropdown-list')}>
    <ul className="boldrui-header__dropdown" role="menubar" aria-hidden="false">
      {props.data.map(item => (
        <DropdownListItem
          key={item.id}
          item={item}
          parentClass={null}
          closeDropdowns={props.closeDropdowns}
        />
      ))}
    </ul>
  </div>
);

export default DropdownList;
