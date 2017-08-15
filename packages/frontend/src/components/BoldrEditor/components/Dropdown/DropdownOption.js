/* @flow weak */

import React, { Component } from 'react';
import classNames from 'classnames';

export type Props = {
  children: ReactChildren,
  value: ?any,
  onClick: ?Function,
  onSelect: ?Function,
  setHighlighted: ?Function,
  index: ?number,
  disabled: ?boolean,
  active: ?boolean,
  highlighted: ?boolean,
  className: ?string,
  title: ?string,
};

export default class DropdownOption extends Component {
  static defaultProps = {
    highlighted: false,
    highlightedClassName: 'boldredit-highlight',
  };
  props: Props;

  onClick: Function = (event): void => {
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

  render(): Object {
    const { children, active, disabled, highlighted, className, title } = this.props;

    const classes: () => ClassNamesFn = classNames('boldredit-dropdown__option--default', {
      'boldredit-dropdown__option--active': active,
      'boldredit-dropdown__option--highlighted': highlighted,
      'boldredit-dropdown__option--disabled': disabled,
      className,
    });
    return (
      <li
        className={classes}
        onMouseEnter={this.setHighlighted}
        onMouseLeave={this.resetHighlighted}
        onClick={this.onClick}
        aria-selected={active}
        title={title}
      >
        {children}
      </li>
    );
  }
}
