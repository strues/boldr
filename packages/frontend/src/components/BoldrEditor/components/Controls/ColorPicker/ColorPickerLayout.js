/* eslint-disable react/no-unused-prop-types, react/no-array-index-key */
/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import PaintBrush from '@boldr/icons/PaintBrush';
import { stopPropagation } from '../../../utils/common';
import Option from '../../Option';
import type { ColorPickerConfig } from '../../../core/config';
import {
  ColorWrapper,
  ColorModal,
  ColorHeader,
  ColorModalLabel,
  ColorOptions,
} from './ColorPicker.styled';

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
      <ColorModal className={modalClassName} onClick={stopPropagation}>
        <ColorHeader>
          <ColorModalLabel active={currentStyle === 'color'} onClick={this.setCurrentStyleColor}>
            Text
          </ColorModalLabel>
          <ColorModalLabel
            active={currentStyle === 'bgcolor'}
            onClick={this.setCurrentStyleBgcolor}
          >
            Background
          </ColorModalLabel>
        </ColorHeader>
        <ColorOptions>
          {colors.map((color, index) =>
            <Option
              value={color}
              key={index}
              active={currentSelectedColor === color}
              onClick={this.onChange}
              isDark
            >
              <span style={{ backgroundColor: color }} className="be-colorpicker__cube" />
            </Option>,
          )}
        </ColorOptions>
      </ColorModal>
    );
  };

  render(): React.Node {
    const { expanded, onExpandEvent } = this.props;
    return (
      <ColorWrapper
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="be-color-picker"
        title={this.props.config.title}
      >
        <Option onClick={onExpandEvent} className={classNames(this.props.config.className)}>
          <PaintBrush color="#222" onClick={onExpandEvent} />
        </Option>
        {expanded ? this.renderModal() : undefined}
      </ColorWrapper>
    );
  }
}

export default ColorPickerLayout;
