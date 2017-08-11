/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';

import { stopPropagation } from '../../utils/common';

export type Props = {
  children: ReactChildren,
  onChange: ?Function,
  className: ?string,
  expanded: ?boolean,
  doExpand: ?Function,
  doCollapse: ?Function,
  onExpandEvent: ?Function,
  optionWrapperClassName: ?string,
  ariaLabel: ?string,
  title: ?string,
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
        className={classNames('boldrui-editor__dropdown-wrapper', className)}
        aria-expanded={expanded}
        aria-label={ariaLabel || 'boldrui-editor__dropdown'}
      >
        <a className="boldrui-editor__dropdown-selectedtext" onClick={onExpandEvent} title={title}>
          {children[0]}
          <div
            className={classNames({
              'boldrui-editor__dropdown-carettoclose': expanded,
              'boldrui-editor__dropdown-carettoopen': !expanded,
            })}
          />
        </a>
        {expanded
          ? <ul
              className={classNames(
                'boldrui-editor__dropdown-optionwrapper',
                optionWrapperClassName,
              )}
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
