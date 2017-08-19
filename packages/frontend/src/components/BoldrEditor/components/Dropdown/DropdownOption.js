/* eslint-disable react/no-unused-prop-types */
/* @flow */

import * as React from 'react';
import styled from 'styled-components';

export type Props = {
  children: React.ChildrenArray<React.Node>,
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

const DropdownOpt = styled.li`
  display: flex;
  align-items: center;
  min-height: 25px;
  padding: 0 5px;
  background: ${props => (props.highlighted ? '#f1f1f1' : '#fff')};
`;

export default class DropdownOption extends React.Component<Props, *> {
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

  render(): React.Node {
    const { children, active, highlighted, title } = this.props;
    return (
      <DropdownOpt
        onMouseEnter={this.setHighlighted}
        onMouseLeave={this.resetHighlighted}
        onClick={this.onClick}
        aria-selected={active}
        active={active}
        highlighted={highlighted}
        title={title}
      >
        {children}
      </DropdownOpt>
    );
  }
}
