/* @flow */
import React, { Component } from 'react';
import type { ReactElement } from '../../../../types/react';

type Props = {
  onToggle: Function,
  style?: string,
  active: boolean,
  icon?: ReactElement,
  label?: string,
  onToggle: Function,
};

class StyleButton extends Component {
  constructor() {
    super();

    (this: any).onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  props: Props;
  render() {
    let className = 'be-btn';
    if (this.props.active) {
      className += ' be-btn__active';
    }

    return (
    <span className={ className } onMouseDown={ this.onToggle }>
      {
        this.props.icon || this.props.label
      }
    </span>
    );
  }
}

export default StyleButton;
