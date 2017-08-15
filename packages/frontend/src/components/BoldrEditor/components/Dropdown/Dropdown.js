/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';

import styled from 'styled-components';

const Holder = styled.div`
  z-index: 190;
  background: #fff;
  border: 1px solid #eaeaea;
`;
export type Props = {
  children: Array<ReactChildren>,
  onChange: ?Function,
  className: ?string,
  title: string,
  onExpandEvent: ?Function,
  optionWrapperClassName: ?string,
};

export default class Dropdown extends Component {
  static defaultProps = {
    title: '',
  };

  state: Object = {
    expanded: false,
    highlighted: -1,
  };

  props: Props;
  handleChange: Function = (event: Event): void => {
    const value: string = event.target.value;
    this.props.onChange(value);
  };

  setHighlighted: Function = (highlighted: number): void => {
    this.setState({
      highlighted,
    });
  };
  expandMenu = () => {
    this.setState({
      expanded: true,
    });
  };
  collapseMenu = () => {
    this.setState({
      expanded: false,
    });
  };
  toggleExpansion: Function = (): void => {
    // const { doExpand, doCollapse, expanded } = this.props;
    if (this.state.expanded) {
      this.collapseMenu();
    } else {
      this.expandMenu();
    }
  };

  render() {
    const { children, className } = this.props;
    const { highlighted } = this.state;
    const { expanded } = this.state;
    const options = children.slice(1, children.length);
    return (
      <div
        className={classNames('boldredit-dropdown__wrapper', className)}
        aria-expanded={expanded}
        aria-label="boldredit-dropdown-control"
      >
        <a
          className="boldredit-dropdown__selectedtext"
          onClick={this.toggleExpansion}
          title={this.props.title}
        >
          {children[0]}
          <div
            className={classNames({
              'boldredit-dropdown__carettoclose': expanded,
              'boldredit-dropdown__carettoopen': !expanded,
            })}
          />
        </a>
        {this.state.expanded
          ? <Holder>
              {React.Children.map(options, (option, index) => {
                const temp =
                  option &&
                  React.cloneElement(option, {
                    onSelect: this.props.onChange,
                    highlighted: highlighted === index,
                    setHighlighted: this.setHighlighted,
                    index,
                  });
                return temp;
              })}
            </Holder>
          : null}
      </div>
    );
  }
}
