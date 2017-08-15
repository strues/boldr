/* @flow */

import React, { Component } from 'react';
import cN from 'classnames';

export type Props = {
  onClick: Function,
  children: ?ReactChildren,
  value: ?string,
  active: ?boolean,
  disabled: ?boolean,
  title: ?string,
};

export default class Option extends Component {
  static defaultProps = {
    disabled: false,
  };
  // shouldComponentUpdate(nextProps: Props) {
  //   if (this.props.value !== nextProps.value) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  props: Props;
  handleClick: Function = () => {
    const { disabled, onClick, value } = this.props;
    if (!disabled) {
      onClick(value);
    }
  };

  render() {
    const { children, active, disabled, title } = this.props;
    const classes = cN('boldredit-option__wrapper', {
      'boldredit-option--active': active,
      'boldredit-option--disabled': disabled,
    });
    return (
      <div className={classes} onClick={this.handleClick} aria-selected={active} title={title}>
        {children}
      </div>
    );
  }
}
