import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import DropdownList from '../DropdownList';
import styles from './dropdown.scss';

const cx = classNames.bind(styles);

class Dropdown extends Component {
  static propTypes = {
    data: PropTypes.object,
    closeDropdowns: PropTypes.func,
    open: PropTypes.bool,
  }

  static defaultProps = {
    data: {},
  }

  render() {
    const { data, closeDropdowns, open } = this.props;

    return (
      <div className={ cx('boldr-menu__dropdown', { 'boldr-menu__dropdown-open': open }) }
        aria-hidden={ open ? 'false' : 'true' }
      >
        <DropdownList
          key={ data.id }
          data={ data.children.items }
          closeDropdowns={ closeDropdowns }
        />
      </div>
    );
  }
}

export default Dropdown;
