import React, { Component, PropTypes } from 'react';

export type Props = {
  onToggle?: Function,
  style?: string,
  active?: boolean,
  icon?: number | string | React.Element | Array<any>,
  label?: string,
};

class StyleButton extends Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  props: Props;

  render() {
    let className = 'DraftJSEditor-styleButton';
    if (this.props.active) {
      className += ' DraftJSEditor-activeButton';
    }

    return (
        <span className={ className } onMouseDown={ this.onToggle }>
         { this.props.icon ? this.props.icon : this.props.label }
        </span>
      );
  }
}

export default StyleButton;
