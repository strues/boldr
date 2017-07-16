/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '@boldr/ui/Icons/Icon';
import { stopPropagation } from '../../../utils/common';
import Option from '../../Option';

type Props = {
  expanded: ?boolean,
  onExpandEvent: ?Function,
  onChange: ?Function,
  config: ?Object,
  currentState: ?Object,
};

class ColorPickerLayout extends Component {
  state: Object = {
    currentStyle: 'color',
  };

  componentWillReceiveProps(props) {
    if (!this.props.expanded && props.expanded) {
      this.setState({
        currentStyle: 'color',
      });
    }
  }
  props: Props;
  setCurrentStyleBgcolor: Function = (): void => {
    this.setState({
      currentStyle: 'bgcolor',
    });
  };

  setCurrentStyleColor: Function = (): void => {
    this.setState({
      currentStyle: 'color',
    });
  };

  onChange: Function = (color: string): void => {
    const { onChange } = this.props;
    const { currentStyle } = this.state;
    onChange(currentStyle, color);
  };

  renderModal: Function = (): Object => {
    const { config: { popupClassName, colors }, currentState: { color, bgColor } } = this.props;
    const { currentStyle } = this.state;
    const currentSelectedColor = currentStyle === 'color' ? color : bgColor;
    return (
      <div
        className={classNames('boldrui-editor__colorpicker-modal', popupClassName)}
        onClick={stopPropagation}
      >
        <span className="boldrui-editor__colorpicker-modal-header">
          <span
            className={classNames('boldrui-editor__colorpicker-modal-style-label', {
              'boldrui-editor__colorpicker-modal-style-label-active': currentStyle === 'color',
            })}
            onClick={this.setCurrentStyleColor}
          >
            Text
          </span>
          <span
            className={classNames('boldrui-editor__colorpicker-modal-style-label', {
              'boldrui-editor__colorpicker-modal-style-label-active': currentStyle === 'bgcolor',
            })}
            onClick={this.setCurrentStyleBgcolor}
          >
            Background
          </span>
        </span>
        <span className="boldrui-editor__colorpicker-modal-options">
          {colors.map((color, index) =>
            <Option
              value={color}
              key={index}
              className="boldrui-editor__colorpicker-option"
              activeClassName="boldrui-editor__colorpicker-option-active"
              active={currentSelectedColor === color}
              onClick={this.onChange}
            >
              <span
                style={{ backgroundColor: color }}
                className="boldrui-editor__colorpicker-cube"
              />
            </Option>,
          )}
        </span>
      </div>
    );
  };

  render(): Object {
    const { config: { icon, className, title }, expanded, onExpandEvent } = this.props;
    return (
      <div
        className="boldrui-editor__colorpicker-wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-color-picker"
        title={title}
      >
        <Option onClick={onExpandEvent} className={classNames(className)}>
          <Icon kind="color" color="#222" />
        </Option>
        {expanded ? this.renderModal() : undefined}
      </div>
    );
  }
}

export default ColorPickerLayout;
