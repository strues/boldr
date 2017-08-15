/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import { Select } from '@boldr/ui';
import { stopPropagation } from '../../utils';

export type Props = {
  children: Array<ReactChildren>,
  onChange: ?Function,
  className: ?string,
  expanded: boolean,
  doExpand: ?Function,
  title: string,
  doCollapse: ?Function,
  onExpandEvent: ?Function,
  optionWrapperClassName: ?string,
};

export default class Dropdown extends Component {
  static defaultProps = {
    title: '',
  };

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
  shouldComponentUpdate(nextProps: Object) {
    if (this.props.expanded !== nextProps.expanded) {
      return true;
    } else {
      return false;
    }
  }
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

  toggleExpansion: Function = (): void => {
    const { doExpand, doCollapse, expanded } = this.props;
    if (expanded) {
      doCollapse();
    } else {
      doExpand();
    }
  };

  render() {
    const { expanded, children, className, optionWrapperClassName, onExpandEvent } = this.props;
    const { highlighted } = this.state;
    const options = children.slice(1, children.length);
    return (
      <div
        className={classNames('boldredit-dropdown__wrapper', className)}
        aria-expanded={expanded}
        aria-label="boldredit-dropdown-control"
      >
        <a
          className="boldredit-dropdown__selectedtext"
          onClick={onExpandEvent}
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
        {expanded
          ? <Select>
              {React.Children.map(options, (option, index) => {
                const temp =
                  option &&
                  React.cloneElement(option, {
                    onSelect: this.handleChange,
                    highlighted: highlighted === index,
                    setHighlighted: this.setHighlighted,
                    index,
                  });
                return temp;
              })}
            </Select>
          : null}
      </div>
    );
  }
}
