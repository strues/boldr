/**
 * This component is adapted from https://github.com/casesandberg/react-color.
 * See LICENSE for permissions.
 *
 * It's a modified Sketch color picker.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Popover from '../Popover';
import ColorBoard from './ColorBoard';
import SketchPresetColors from './SketchPresetColors';
import PopoverClickTrigger from './PopoverClickTrigger';

class ColorPicker extends Component {
  state = {
    popVisible: false,
  };

  static propTypes = {
    color: PropTypes.string.isRequired,
    showAlpha: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
    prefix: PropTypes.string,
    type: PropTypes.oneOf(['default', 'simple']),
    presetColors: PropTypes.array,
  };

  static defaultProps = {
    showAlpha: false,
    onChange() {},
    className: '',
    wrapperClassName: '',
    type: 'default',
    presetColors: [
      '#FFFFFF',
      '#F8F8F8',
      '#F2F2F2',
      '#999999',
      '#444444',
      '#FF4444',
      '#FF6500',
      '#FF884D',
      '#FFCD00',
      '#3FBD00',
      '#3FBC87',
      '#00CD98',
      '#5197FF',
      '#BADCFF',
      '#FFEFB8',
    ],
  };

  static ColorBoard = ColorBoard;

  handleChange = color => {
    const { onChange, showAlpha } = this.props;
    let transColor = color;
    if (typeof color === 'object') {
      transColor = showAlpha ? color.rgba : color.hex;
    }
    onChange(transColor);
  };

  handleVisibleChange = visible => {
    this.setState({
      popVisible: visible,
    });
  };

  render() {
    const {
      color,
      showAlpha,
      prefix,
      className,
      wrapperClassName,
      type,
      presetColors,
    } = this.props;
    const { popVisible } = this.state;
    const openClassName = popVisible ? 'open' : '';
    const backgroundColor = color;

    return (
      <Popover
        className={cn('boldr-colorpicker__popover', className)}
        position={Popover.Position.AutoBottomLeft}
        display="inline"
        cushion={5}
        visible={popVisible}
        onVisibleChange={this.handleVisibleChange}>
        <PopoverClickTrigger>
          <div className={cn('boldr-colorpicker', wrapperClassName, openClassName)} tabIndex={0}>
            <div className={cn('boldr-colorpicker__text')}>
              <div className={cn('boldr-colorpicker__preview')} style={{ backgroundColor }} />
            </div>
          </div>
        </PopoverClickTrigger>
        <Popover.Content>
          {type === 'simple' ? (
            <SketchPresetColors
              colors={presetColors}
              onClick={this.handleChange}
              prefix={prefix}
              type={type}
            />
          ) : (
            <ColorBoard
              color={color}
              showAlpha={showAlpha}
              onChange={this.handleChange}
              prefix={prefix}
              type={type}
            />
          )}
        </Popover.Content>
      </Popover>
    );
  }
}

export default ColorPicker;
