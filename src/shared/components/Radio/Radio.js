import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Radio extends PureComponent {
  static propTypes = {
    checked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    value: PropTypes.any,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,

    // will be rewritten by RadioGroup
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    prefix: PropTypes.string,
  };

  static defaultProps = {
    prefix: 'boldrui',
    className: '',
    style: {},
    onChange() {},
  };

  handleChange = evt => {
    const props = this.props;

    props.onChange({
      target: {
        ...props,
        type: 'radio',
        checked: evt.target.checked,
      },

      preventDefault() {
        evt.preventDefault();
      },

      stopPropagation() {
        evt.stopPropagation();
      },
    });
  };

  render() {
    const {
      checked,
      // onChange,
      className,
      style,
      prefix,
      disabled,
      readOnly,
      children,
      value, // eslint-disable-line

      ...others
    } = this.props;

    const classString = classNames({
      [className]: !!className,
      [`${prefix}-radio-wrap`]: true,
      [`${prefix}-radio-checked`]: !!checked,
      [`${prefix}-radio-disabled`]: disabled || readOnly,
    });

    return (
      <label className={classString} style={style}>
        <span className={`${prefix}-radio`}>
          <span className={`${prefix}-radio-inner`} />
          <input
            {...others}
            type="radio"
            checked={!!checked}
            disabled={disabled}
            readOnly={readOnly}
            onChange={this.handleChange}
          />
        </span>
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
