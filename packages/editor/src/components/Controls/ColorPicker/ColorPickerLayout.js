/* eslint-disable react/no-unused-prop-types, react/no-array-index-key */
/* @flow */

import React from 'react';
import type { Node } from 'react';
import cn from 'classnames';
import { EyeDropper } from '../../Icons';
import { stopPropagation } from '../../../utils/common';
import Option from '../../Option';
import type { ColorPickerConfig } from '../../../core/config';

type ColorCurrent = {
  color: string,
  bgColor: string,
};
type Props = {
  expanded?: boolean,
  onChange?: Function,
  config: ColorPickerConfig,
  onExpandEvent: Function,
  currentState: ColorCurrent,
};

type State = {
  currentStyle: string,
};

class ColorPickerLayout extends React.Component<Props, State> {
  state = {
    currentStyle: 'color',
  };

  componentWillReceiveProps(props: Props) {
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

  renderModal: Function = (): React.Node => {
    const { config: { modalClassName, colors }, currentState: { color, bgColor } } = this.props;
    const { currentStyle } = this.state;
    const currentSelectedColor = currentStyle === 'color' ? color : bgColor;
    return (
      <div className={cn('be-modal', modalClassName)} onClick={stopPropagation}>
        <div className={cn('be-modal__top')}>
          <span
            className={cn('be-color__modal-label', {
              'is-active': currentStyle === 'color',
            })}
            onClick={this.setCurrentStyleColor}>
            Text
          </span>
          <span
            className={cn('be-color__modal-label', {
              'is-active': currentStyle === 'bgcolor',
            })}
            onClick={this.setCurrentStyleBgcolor}>
            Background
          </span>
        </div>
        <span className={cn('be-color__modal-opts')}>
          {colors.map((color, index) => (
            <Option
              value={color}
              key={index}
              active={currentSelectedColor === color}
              onClick={this.onChange}
              isDark>
              <span style={{ backgroundColor: color }} className="be-color__cube" />
            </Option>
          ))}
        </span>
      </div>
    );
  };

  render(): Node {
    const { expanded, onExpandEvent } = this.props;
    return (
      <div
        className={cn('be-ctrl__group')}
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="be-color-picker"
        title={this.props.config.title}>
        <Option onClick={onExpandEvent} className={cn(this.props.config.className)}>
          <EyeDropper fill="#222" size={20} onClick={onExpandEvent} />
        </Option>
        {expanded ? this.renderModal() : undefined}
      </div>
    );
  }
}

export default ColorPickerLayout;
