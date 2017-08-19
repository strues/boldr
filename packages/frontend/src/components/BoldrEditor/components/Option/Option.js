/* eslint-disable react/no-unused-prop-types */
/* @flow */

import * as React from 'react';
import cN from 'classnames';

export type Props = {
  onClick: Function,
  children: React.ChildrenArray<React.Node>,
  value?: string,
  active?: boolean,
  className?: string,
  disabled?: boolean,
  title?: string,
};

export default class Option extends React.Component<Props, *> {
  static defaultProps = {
    disabled: false,
  };

  props: Props;

  onClick: Function = () => {
    const { disabled, onClick, value } = this.props;
    if (!disabled) {
      onClick(value);
    }
  };

  render() {
    const { children, className, active, disabled, title } = this.props;
    return (
      <div
        className={cN('be-option__wrapper', className, {
          'be-option--active': active,
          'be-option--disabled': disabled,
        })}
        onClick={this.onClick}
        aria-selected={active}
        title={title}
      >
        {children}
      </div>
    );
  }
}
