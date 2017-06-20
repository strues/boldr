/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '@@components/Icons';
import { stopPropagation } from '../../../../utils/common';
import Option from '../../../Option';

type Props = {
  expanded: boolean,
  onExpandEvent: Function,
  onChange: Function,
  config: Object,
  currentState: Object,
};

class LayoutComponent extends Component {
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
    const {
      config: { popupClassName, colors },
      currentState: { color, bgColor },
    } = this.props;
    const { currentStyle } = this.state;
    const currentSelectedColor = currentStyle === 'color' ? color : bgColor;
    return (
      <div
        className={classNames(
          'boldr-editor__colorpicker-modal',
          popupClassName,
        )}
        onClick={stopPropagation}
      >
        <span className="boldr-editor__colorpicker-modal-header">
          <span
            className={classNames(
              'boldr-editor__colorpicker-modal-style-label',
              {
                'boldr-editor__colorpicker-modal-style-label-active': currentStyle ===
                  'color',
              },
            )}
            onClick={this.setCurrentStyleColor}
          >
            Text
          </span>
          <span
            className={classNames(
              'boldr-editor__colorpicker-modal-style-label',
              {
                'boldr-editor__colorpicker-modal-style-label-active': currentStyle ===
                  'bgcolor',
              },
            )}
            onClick={this.setCurrentStyleBgcolor}
          >
            Background
          </span>
        </span>
        <span className="boldr-editor__colorpicker-modal-options">
          {colors.map((color, index) => (
            <Option
              value={color}
              key={index}
              className="boldr-editor__colorpicker-option"
              activeClassName="boldr-editor__colorpicker-option-active"
              active={currentSelectedColor === color}
              onClick={this.onChange}
            >
              <span
                style={{ backgroundColor: color }}
                className="boldr-editor__colorpicker-cube"
              />
            </Option>
          ))}
        </span>
      </div>
    );
  };

  render(): Object {
    const {
      config: { icon, className, title },
      expanded,
      onExpandEvent,
    } = this.props;
    return (
      <div
        className="boldr-editor__colorpicker-wrapper"
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

export default LayoutComponent;
