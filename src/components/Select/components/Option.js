/* @flow */
import React, { Component } from 'react';

export type Props = {
  prefixCls?: string,
  cid?: string,
  value?: any,
  text?: any,
  placeholder?: string,
  onMouseEnter?: Function,
};

class Option extends Component {
  props: Props;

  optionClickHandler = ev => {
    this.props.onClick(ev, this.props.cid);
  };

  render() {
    const { className, text, value } = this.props;
    return (
      <span
        value={value}
        className={className}
        onClick={this.optionClickHandler}
        onMouseEnter={this.props.onMouseEnter}
      >
        {text}
      </span>
    );
  }
}

export default Option;
