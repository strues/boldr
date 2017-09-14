import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class TooltipContent extends Component {
  static propTypes = {
    textAlign: PropTypes.string,

    maxWidth: PropTypes.string,
    /**
     * Tooltip content to be rendered
     */
    children: PropTypes.node.isRequired,

    /**
     * Specifies tooltip theme
     */
    theme: PropTypes.oneOf(['light', 'dark', 'error']),

    /**
     * Specifies on which side the arrow should be shown
     */
    arrowPlacement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * Custom CSS style object (used to allow setting arrow position)
     */
    arrowStyle: PropTypes.object,

    /**
     * Custom CSS style object (used to allow setting the position)
     */
    style: PropTypes.object,

    /**
     * Callback triggered when mouse enters the component
     * Used for showing tooltip when mouse leaves the target element, but hovers the tooltip itself
     */
    onMouseEnter: PropTypes.func,

    /**
     * Callback triggered when mouse leaves the component
     * Used for showing tooltip when mouse leaves the target element, but hovers the tooltip itself
     */
    onMouseLeave: PropTypes.func,

    /**
     * Specifies if tooltip content should use bouncing animation.
     */
    bounce: PropTypes.bool,
    isSize: PropTypes.oneOf(['normal', 'large']),
  };

  static defaultProps = {
    theme: 'light',
    arrowPlacement: 'bottom',
    maxWidth: '1200px',
    isSize: 'normal',
    textAlign: 'center',
  };

  render() {
    const {
      children,
      theme,
      arrowPlacement,
      arrowStyle,
      style,
      onMouseEnter,
      onMouseLeave,
      bounce,
      isSize,
      textAlign,
    } = this.props;

    return (
      <div
        className="boldr-tooltip__root"
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
        <div className="boldr-tooltip--fadein">
          <div
            className={classnames({
              [`bounce-on-${arrowPlacement}`]: bounce,
            })}>
            <div
              className={classnames(
                'boldr-tooltip',
                `boldr-tooltip ${[theme]}`,
                `boldr-tooltip ${[isSize]}`,
              )}
              style={{ maxWidth: this.props.maxWidth, textAlign }}>
              <div>{children}</div>
              <div
                className={classnames(
                  'boldr-tooltip__arrow',
                  `boldr-tooltip__arrow ${[arrowPlacement]}`,
                )}
                style={arrowStyle}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TooltipContent;
