/* @flow */
import React, { Component } from 'react';

export type Props = {
  prefixCls?: string,
  cid?: string,
  value?: any,
  text?: any,
  onFocus?: Function,
};

class Tag extends Component {
  constructor(props: Props) {
    super(props);
    this.deleteTagHandler = this.deleteTagHandler.bind(this);
  }

  props: Props;

  deleteTagHandler(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.props.onDelete(this.props.cid);
  }

  render() {
    let { prefixCls, text } = this.props;

    return (
      <span>
        {text
          ? <span className={`${prefixCls}-tag`}>
              {text}
              <i className={`${prefixCls}-delete`} onClick={this.deleteTagHandler} />
            </span>
          : ''}
      </span>
    );
  }
}

export default Tag;
