// @flow
import * as React from 'react';
import classNames from 'classnames';

import { stopPropagation } from '../../utils/common';

export type Props = {
  children: React.ChildrenArray<React.Node>,
  onChange: ?Function,
  className: ?string,
  title: string,
  expanded: ?boolean,
  doExpand: Function,
  doCollapse: Function,
  onExpandEvent: Function,
  ariaLabel: ?string,
  optionWrapperClassName: ?string,
};

type State = {
  highlighted: number,
};

export default class Dropdown extends React.Component<Props, State> {
  state: State = {
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
        className={classNames('boldr-editor-dropdown__wrapper', className)}
        aria-expanded={expanded}
        aria-label={ariaLabel || 'boldr-editor-dropdown'}
      >
        <a className="boldr-editor-dropdown__selected-text" onClick={onExpandEvent} title={title}>
          {children[0]}
          <div
            className={classNames({
              'boldr-editor-dropdown__caret--close': expanded,
              'boldr-editor-dropdown__caret--open': !expanded,
            })}
          />
        </a>
        {expanded
          ? <ul
              className={classNames(
                'boldr-editor-dropdown__option-wrapper',
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
          : undefined}
      </div>
    );
  }
}
