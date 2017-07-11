/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export type Props = {
  children: ?ReactChildren,
  value: ?any,
  onClick: ?Function,
  onSelect: ?Function,
  setHighlighted: ?Function,
  index: ?number,
  disabled: ?boolean,
  active: ?boolean,
  highlighted: ?boolean,
  className: ?string,
  activeClassName: ?string,
  disabledClassName: ?string,
  highlightedClassName: ?string,
  title: ?string,
};

export default class DropDownOption extends Component {
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
    const {
      children,
      active,
      disabled,
      highlighted,
      className,
      activeClassName,
      disabledClassName,
      highlightedClassName,
      title,
    } = this.props;
    return (
      <li
        className={classNames('boldr-editor__dropdown-option-default', className, {
          [`boldr-editor__dropdown-option-active ${activeClassName}`]: active,
          [`boldr-editor__dropdown-option-highlighted ${highlightedClassName}`]: highlighted,
          [`boldr-editor__dropdown-option-disabled ${disabledClassName}`]: disabled,
        })}
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
// todo: review classname use above.
