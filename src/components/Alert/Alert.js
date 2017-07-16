import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import { StyleClasses } from '../../theme/styleClasses';

const BASE_ELEMENT = StyleClasses.ALERT;

const styleClassMap = {
  info: 'alert-style-info',
  warning: 'alert-style-warning',

  // error as an alias to danger
  error: 'alert-style-danger',
  danger: 'alert-style-danger',
};

const sizeClassMap = {
  normal: 'alert-size-normal',
  large: 'alert-size-large',
};

export default class Alert extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['info', 'warning', 'danger', 'error']).isRequired,
    size: PropTypes.oneOf(['large', 'normal']),
    rounded: PropTypes.bool,
    closable: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    prefix: PropTypes.string,
  };

  static defaultProps = {
    type: 'info',
    size: 'normal',
    closable: false,
    rounded: false,
    className: '',
    prefix: 'boldrui',
  };

  state = {
    closed: false,
  };

  onClose = () => {
    this.setState(
      {
        closed: true,
      },
      () => {
        const { onClose } = this.props;
        if (isFunction(onClose)) {
          onClose();
        }
      },
    );
  };

  render() {
    const { closed } = this.state;
    if (closed) {
      return null;
    }

    const { type, prefix, rounded, className, closable, size, children } = this.props;
    const containerCls = cx(
      `${prefix}-alert`,
      `${prefix}-${styleClassMap[type]}`,
      `${prefix}-${sizeClassMap[size]}`,
      {
        [className]: !!className,
        [`${prefix}-alert-border-rounded`]: rounded,
        [`${prefix}-alert-closable`]: closable,
      },
    );

    return (
      <div className={containerCls}>
        {closable &&
          <div className={`${prefix}-alert-close-wrapper`}>
            <span className={`${prefix}-alert-close-btn`} onClick={this.onClose}>
              ×
            </span>
          </div>}
        <div className={`${prefix}-alert-content-wrapper`}>
          <div className={`${prefix}-alert-content`}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
