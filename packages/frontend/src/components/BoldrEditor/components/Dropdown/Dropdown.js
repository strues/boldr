/* eslint-disable react/no-array-index-key, react/no-unused-prop-types, no-inline-comments */
// @flow
import * as React from 'react';
import { stopPropagation } from '../../utils/common';

import {
  DropdownWrapper,
  DropdownSelectedText,
  CaretClosed,
  CaretOpen,
  DropdownOptionWrapper,
} from './Dropdown.styled';

export type Props = {
  children: React.ChildrenArray<React.Node>,
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
    const options: Array<React.Node> = children.slice(1, children.length);
    return (
      <DropdownWrapper
        isSkinny={this.props.isSkinny}
        className={className}
        aria-expanded={expanded}
        aria-label={ariaLabel || 'be-dropdown'}>
        <DropdownSelectedText onClick={onExpandEvent} title={title}>
          {/* // $FlowIssue */}
          {children[0]}
          {expanded ? <CaretClosed /> : <CaretOpen />}
        </DropdownSelectedText>
        {expanded ? (
          <DropdownOptionWrapper className={optionWrapperClassName} onClick={stopPropagation}>
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
          </DropdownOptionWrapper>
        ) : (
          undefined
        )}
      </DropdownWrapper>
    );
  }
}
