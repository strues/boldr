/* eslint-disable react/no-unused-prop-types */
/* @flow */

import * as React from 'react';
import { OptionWrapper } from './Option.styled';

export type Props = {
  onClick: Function,
  children: React.ChildrenArray<React.Node>,
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

  render() {
    const { children, className, active, disabled, title, isDark } = this.props;
    return (
      <OptionWrapper
        className={className}
        onClick={this.onClick}
        isDark={isDark}
        aria-selected={active}
        active={active}
        disabled={disabled}
        title={title}
      >
        {children}
      </OptionWrapper>
    );
  }
}
