/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '@boldr/ui/Icons/Icon';
import shortid from 'shortid';
import { stopPropagation } from '../../../utils/common';
import Option from '../../Option';

type Props = {
  expanded: ?boolean,
  onExpandEvent: ?Function,
  onChange: ?Function,
  config: Object,
  currentState: ?Object,
};

class ColorPickerLayout extends Component {
  state: Object = {
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
        className={classNames('boldredit-colorpicker__modal', popupClassName)}
        onClick={stopPropagation}
      >
        <span className="boldredit-colorpicker__modal-header">
          <span
            className={classNames('boldredit-colorpicker__modal-style-label', {
              'boldredit-colorpicker__modal-style-label-active': currentStyle === 'color',
            })}
            onClick={this.setCurrentStyleColor}
          >
            Text
          </span>
          <span
            className={classNames('boldredit-colorpicker__modal-style-label', {
              'boldredit-colorpicker__modal-style-label-active': currentStyle === 'bgcolor',
            })}
            onClick={this.setCurrentStyleBgcolor}
          >
            Background
          </span>
        </span>
        <span className="boldredit-colorpicker__modal-options">
          {colors.map(color =>
            <Option
              value={color}
              key={shortid.generate()}
              className="boldredit-colorpicker__option"
              activeClassName="boldredit-colorpicker__option--active"
              active={currentSelectedColor === color}
              onClick={this.onChange}
            >
              <span style={{ backgroundColor: color }} className="boldredit-colorpicker__cube" />
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
        className="boldredit-colorpicker__wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-color-picker"
        title={this.props.config.title}
      >
        <Option onClick={onExpandEvent} className={classNames(this.props.config.className)}>
          <Icon kind="color" color="#222" />
        </Option>
        {expanded ? this.renderModal() : undefined}
      </div>
    );
  }
}

export default ColorPickerLayout;
