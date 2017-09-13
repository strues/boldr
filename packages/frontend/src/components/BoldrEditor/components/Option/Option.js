/* eslint-disable react/no-unused-prop-types */
/* @flow */

import React from 'react';
import type { Node } from 'react';
import cn from 'classnames';

export type Props = {
  onClick: Function,
  children: Array<Node>,
  value?: string,
  active?: boolean,
  className?: string,
  isDark: boolean,
  disabled?: boolean,
  title?: string,
};

export default class Option extends React.PureComponent<Props, *> {
  static displayName = 'Option';
  static defaultProps = {
    disabled: false,
    isDark: false,
  };

  props: Props;

  onClick: Function = () => {
    const { disabled, onClick, value } = this.props;
    if (!disabled) {
      onClick(value);
    }
  };

  render(): Node {
    const { children, className, active, disabled, title, isDark } = this.props;
    return (
      <div
        className={cn('be-opt', className, {
          'be-opt--active': active,
          'be-opt--disabled': disabled,
          'be-opt--dark': isDark,
        })}
        onClick={this.onClick}
        aria-selected={active}
        disabled={disabled}
        title={title}>
        {children}
      </div>
    );
  }
}
