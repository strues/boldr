/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import Modal from '@boldr/ui/Modal';
import PaintBrush from '@boldr/icons/PaintBrush';
import uniqueId from 'lodash/uniqueId';
import Option from '../../Option';

type Props = {
  expanded: ?boolean,
  onChange: ?Function,
  config: Object,
  currentState: ?Object,
};

class ColorPickerLayout extends Component {
  state: Object = {
    showModal: false,
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
  openModal: Function = (): void => {
    this.setState({
      showModal: true,
    });
  };
  hideModal: Function = (): void => {
    this.setState({
      showModal: false,
    });
  };
  onChange: Function = (color: string): void => {
    const { onChange } = this.props;
    const { currentStyle } = this.state;
    onChange(currentStyle, color);
  };

  renderModal: Function = (): Object => {
    const { config: { colors }, currentState: { color, bgColor } } = this.props;
    const { currentStyle } = this.state;
    const currentSelectedColor = currentStyle === 'color' ? color : bgColor;
    return (
      <Modal
        title="Color Picker"
        isVisible={this.state.showModal}
        onClose={this.hideModal}
        closeable
      >
        <span className="boldredit-colorpicker__modal-header">
          <span
            className={classNames('boldredit-colorpicker__modal-style-label', {
              'boldredit-colorpicker__modal-style-label-active': currentStyle === 'color',
            })}
            onClick={this.setCurrentStyleColor}
          >
            Text Color
          </span>
          <span
            className={classNames('boldredit-colorpicker__modal-style-label', {
              'boldredit-colorpicker__modal-style-label-active': currentStyle === 'bgcolor',
            })}
            onClick={this.setCurrentStyleBgcolor}
          >
            Background Color
          </span>
        </span>
        <span className="boldredit-colorpicker__modal-options">
          {colors.map(color =>
            <Option
              value={color}
              key={uniqueId()}
              className="boldredit-colorpicker__option"
              activeClassName="boldredit-colorpicker__option--active"
              active={currentSelectedColor === color}
              onClick={this.onChange}
            >
              <span style={{ backgroundColor: color }} className="boldredit-colorpicker__cube" />
            </Option>,
          )}
        </span>
      </Modal>
    );
  };

  render(): Object {
    const { expanded } = this.props;
    return (
      <div
        className="boldredit-colorpicker__wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="boldredit-color-picker"
        title={this.props.config.title}
      >
        <Option onClick={this.openModal} className={classNames(this.props.config.className)}>
          <PaintBrush color="#222" />
        </Option>
        {this.renderModal()}
      </div>
    );
  }
}

export default ColorPickerLayout;
