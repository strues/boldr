/* @flow */
import React, { PureComponent } from 'react';

type Props = {
  onToggle: Function,
  style?: string,
  active?: boolean,
  icon?: number | string | ReactElement | Array<any>,
  label?: string,
  onToggle: () => void,
};

class StyleButton extends PureComponent {
  constructor() {
    super();
    (this: any).onToggle = (e) => {
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
        <span className={ className } onMouseDown={ (this: any).onToggle }>
         { this.props.icon ? this.props.icon : this.props.label }
        </span>
    );
  }
}

export default StyleButton;
