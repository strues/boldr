/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';

import { stopPropagation } from '../../utils';

export type Props = {
  children: Array<ReactChildren>,
  onChange: ?Function,
  className: ?string,
  expanded: boolean,
  doExpand: ?Function,
  doCollapse: ?Function,
  onExpandEvent: ?Function,
  optionWrapperClassName: ?string,
  ariaLabel: string,
  title: string,
};
export default class Dropdown extends Component {
  state: Object = {
    highlighted: -1,
  };

  componentWillReceiveProps(props: Props) {
    if (this.props.expanded && !props.expanded) {
      this.setState({
        highlighted: -1,
      });
    }
  }
  props: Props;
  onChange: Function = (value: any): void => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
    this.toggleExpansion();
  };

  setHighlighted: Function = (highlighted: number): void => {
    this.setState({
      highlighted,
    });
  };

  toggleExpansion: Function = (): void => {
    const { doExpand, doCollapse, expanded } = this.props;
    if (expanded) {
      doCollapse();
    } else {
      doExpand();
    }
  };

  render() {
    const {
      expanded,
      children,
      className,
      optionWrapperClassName,
      ariaLabel,
      onExpandEvent,
      title,
    } = this.props;
    const { highlighted } = this.state;
    const options = children.slice(1, children.length);
    return (
      <div
        className={classNames('boldredit-dropdown__wrapper', className)}
        aria-expanded={expanded}
        aria-label={ariaLabel || 'boldredit-dropdown'}
      >
        <a className="boldredit-dropdown__selectedtext" onClick={onExpandEvent} title={title}>
          {children[0]}
          <div
            className={classNames({
              'boldredit-dropdown__carettoclose': expanded,
              'boldredit-dropdown__carettoopen': !expanded,
            })}
          />
        </a>
        {expanded
          ? <ul
              className={classNames('boldredit-dropdown__optionwrapper', optionWrapperClassName)}
              onClick={stopPropagation}
            >
              {React.Children.map(options, (option, index) => {
                const temp =
                  option &&
                  React.cloneElement(option, {
                    onSelect: this.onChange,
                    highlighted: highlighted === index,
                    setHighlighted: this.setHighlighted,
                    index,
                  });
                return temp;
              })}
            </ul>
          : null}
      </div>
    );
  }
}
