/* @flow */

import React, { Component } from 'react';

export type Props = {
  prefixCls?: string,
  value?: any,
  placeholder?: string,
};

class Search extends Component {
  constructor(props: Props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  props: Props;

  componentDidMount() {
    this.input.focus();
  }

  changeHandler(ev) {
    this.props.onChange(ev.target.value);
  }

  render() {
    let { prefixCls, placeholder, keyword } = this.props;

    return (
      <div className={`${prefixCls}-search`}>
        <input
          type="text"
          ref={input => (this.input = input)}
          placeholder={placeholder}
          className={`${prefixCls}-filter`}
          value={keyword}
          onChange={this.changeHandler}
        />
      </div>
    );
  }
}

export default Search;
