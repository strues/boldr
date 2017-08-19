/* eslint-disable react/no-unused-prop-types */
/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import PaintBrush from '@boldr/icons/PaintBrush';
import { stopPropagation } from '../../../utils/common';
import Option from '../../Option';

type Props = {
  expanded: ?boolean,
  onChange: ?Function,
  config: Object,
  onExpandEvent: Function,
  currentState: ?Object,
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

  renderModal: Function = (): Object => {
    const { config: { popupClassName, colors }, currentState: { color, bgColor } } = this.props;
    const { currentStyle } = this.state;
    const currentSelectedColor = currentStyle === 'color' ? color : bgColor;
    return (
      <div
        className={classNames('boldr-editor-colorpicker__modal', popupClassName)}
        onClick={stopPropagation}
      >
        <span className="boldr-editor-colorpicker__modal-header">
          <span
            className={classNames('boldr-editor-colorpicker__modal-style-label', {
              'boldr-editor-colorpicker__modal-style-label--active': currentStyle === 'color',
            })}
            onClick={this.setCurrentStyleColor}
          >
            Text
          </span>
          <span
            className={classNames('boldr-editor-colorpicker__modal-style-label', {
              'boldr-editor-colorpicker__modal-style-label--active': currentStyle === 'bgcolor',
            })}
            onClick={this.setCurrentStyleBgcolor}
          >
            Background
          </span>
        </span>
        <span className="boldr-editor-colorpicker__modal-options">
          {colors.map((color, index) =>
            <Option
              value={color}
              key={index}
              className="boldr-editor-colorpicker__option"
              activeClassName="boldr-editor-colorpicker__option--active"
              active={currentSelectedColor === color}
              onClick={this.onChange}
            >
              <span style={{ backgroundColor: color }} className="boldr-editor-colorpicker__cube" />
            </Option>,
          )}
        </span>
      </div>
    );
  };

  render(): Object {
    const { expanded, onExpandEvent } = this.props;
    return (
      <div
        className="boldr-editor-colorpicker__wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="boldr-editor-color-picker"
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
