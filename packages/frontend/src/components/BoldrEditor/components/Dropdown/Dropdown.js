/* eslint-disable react/no-array-index-key, react/no-unused-prop-types, no-inline-comments */
// @flow
import React from 'react';
import type { Node } from 'react';
import cn from 'classnames';
import { stopPropagation } from '../../utils/common';

export type Props = {
  children: Node,
  onChange?: Function,
  className?: string,
  title: string,
  expanded?: boolean,
  doExpand: Function,
  doCollapse: Function,
  onExpandEvent: Function,
  isSkinny: boolean,
  ariaLabel?: string,
  optionWrapperClassName?: string,
};

type State = {
  highlighted: number,
};

export default class Dropdown extends React.Component<Props, State> {
  static defaultProps = {
    isSkinny: false,
  };

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
    // $FlowIssue
    const options: Array<Node> = children.slice(1, children.length);
    return (
      <div
        className={cn(
          'be-dd__wrap',
          {
            'is-skinny': this.props.isSkinny,
          },
          className,
        )}
        aria-expanded={expanded}
        aria-label={ariaLabel || 'be-dropdown'}>
        <a className={cn('be-dd__selected-txt')} onClick={onExpandEvent} title={title}>
          {/* // $FlowIssue */}
          {children[0]}
          <div
            className={cn({
              'be-caret--closed': expanded,
              'be-caret--open': !expanded,
            })}
          />
        </a>
        {expanded ? (
          <ul className={cn('be-dd__opt-wrap', optionWrapperClassName)} onClick={stopPropagation}>
            {React.Children.map(options, (option, index) => {
              const temp =
                option &&
                // $FlowIssue
                React.cloneElement(option, {
                  onSelect: this.onChange,
                  highlighted: highlighted === index,
                  setHighlighted: this.setHighlighted,
                  index,
                });
              return temp;
            })}
          </ul>
        ) : (
          undefined
        )}
      </div>
    );
  }
}
