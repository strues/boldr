/* eslint-disable react/no-unused-prop-types, react/no-array-index-key */
/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import PaintBrush from '@boldr/icons/PaintBrush';
import { stopPropagation } from '../../../utils/common';
import Option from '../../Option';

type ColorCurrent = {
  color: string,
  bgColor: string,
};
type Props = {
  expanded?: boolean,
  onChange?: Function,
  config: Object,
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
      <div
        className={classNames('be-colorpicker__modal', modalClassName)}
        onClick={stopPropagation}
      >
        <span className="be-colorpicker__modal-header">
          <span
            className={classNames('be-colorpicker__modal-style-label', {
              'be-colorpicker__modal-style-label--active': currentStyle === 'color',
            })}
            onClick={this.setCurrentStyleColor}
          >
            Text
          </span>
          <span
            className={classNames('be-colorpicker__modal-style-label', {
              'be-colorpicker__modal-style-label--active': currentStyle === 'bgcolor',
            })}
            onClick={this.setCurrentStyleBgcolor}
          >
            Background
          </span>
        </span>
        <span className="be-colorpicker__modal-options">
          {colors.map((color, index) =>
            <Option
              value={color}
              key={index}
              className="be-colorpicker__option"
              activeClassName="be-colorpicker__option--active"
              active={currentSelectedColor === color}
              onClick={this.onChange}
            >
              <span style={{ backgroundColor: color }} className="be-colorpicker__cube" />
            </Option>,
          )}
        </span>
      </div>
    );
  };

  render(): React.Node {
    const { expanded, onExpandEvent } = this.props;
    return (
      <div
        className="be-colorpicker__wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="be-color-picker"
        title={this.props.config.title}
      >
        <Option onClick={onExpandEvent} className={classNames(this.props.config.className)}>
          <PaintBrush color="#222" onClick={onExpandEvent} />
        </Option>
        {expanded ? this.renderModal() : undefined}
      </div>
    );
  }
}

export default ColorPickerLayout;
