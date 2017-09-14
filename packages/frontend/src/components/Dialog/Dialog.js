import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Portal from '../Portal';
import DialogElement from './DialogElement';

const { withNoScroll, withCloseOnEsc } = Portal;
const DialogPortal = withNoScroll(Portal);
const DialogPortalCloseOnEsc = withCloseOnEsc(DialogPortal);

export default class Dialog extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    onClose: PropTypes.func,
    visible: PropTypes.bool,
    isVisible: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.node,
    children: PropTypes.node,
    mask: PropTypes.bool,
    hasMask: PropTypes.bool,
    isMaskClosable: PropTypes.bool,
    footer: PropTypes.node,
  };

  static defaultProps = {
    prefix: 'boldr',
    onClose() {},
    visible: false,
    isVisible: false,
    className: '',
    style: {},
    title: '',
    mask: true,
    hasMask: true,
    maskClosable: true,
    isMaskClosable: true,
    footer: null,
  };

  onClose = e => {
    this.props.onClose(e);
  };

  render() {
    const { visible, isVisible, prefix, style } = this.props;

    // load default max/min-width value when width is not specified in style prop
    const elStyle = {
      ...(style.width ? {} : { minWidth: '450px', maxWidth: '75%' }),
      ...style,
    };

    return (
      <DialogPortalCloseOnEsc
        isVisible={isVisible}
        visible={visible}
        onClose={this.onClose}
        className={`${prefix}-dialog-r-anchor`}
        aria-labelledby="contentModal">
        <DialogElement {...this.props} onClose={this.onClose} style={elStyle}>
          {this.props.children}
        </DialogElement>
      </DialogPortalCloseOnEsc>
    );
  }
}
