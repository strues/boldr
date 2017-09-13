/* eslint-disable react/no-unused-prop-types */
/* @flow */

import React from 'react';
import type { Node } from 'react';
import cn from 'classnames';

export type Props = {
  children: Node,
  value?: any,
  onClick?: Function,
  onSelect?: Function,
  setHighlighted?: Function,
  index?: number,
  disabled?: boolean,
  active?: boolean,
  highlighted?: boolean,
  className?: string,
  title?: string,
};

export default class DropdownOption extends React.PureComponent<Props, *> {
  props: Props;

  onClick: Function = (event: SyntheticEvent<>): void => {
    const { onSelect, onClick, value, disabled } = this.props;
    if (!disabled) {
      if (onSelect) {
        onSelect(value);
      }
      if (onClick) {
        event.stopPropagation();
        onClick(value);
      }
    }
  };

  setHighlighted: Function = (): void => {
    const { setHighlighted, index } = this.props;
    setHighlighted(index);
  };

  resetHighlighted: Function = (): void => {
    const { setHighlighted } = this.props;
    setHighlighted(-1);
  };

  render(): Node {
    const { children, active, highlighted, title, disabled } = this.props;
    return (
      <li
        className={cn('be-dd__opt--default', {
          'be-dd__opt--active': active,
          'be-dd__opt--highlight': highlighted,
          'be-dd__opt--disabled': disabled,
        })}
        onMouseEnter={this.setHighlighted}
        onMouseLeave={this.resetHighlighted}
        onClick={this.onClick}
        onKeyDown={this.onClick}
        aria-selected={active}
        title={title}>
        {children}
      </li>
    );
  }
}
