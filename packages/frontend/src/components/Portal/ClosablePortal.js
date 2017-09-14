import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Portal from './Portal';

// visible logic on the Portal is annoying, because it can not use React's update mechanism.
export default class ClosablePortal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    isVisible: PropTypes.bool,
  };

  static defaultProps = {
    visible: true,
    isVisible: true,
  };

  render() {
    const { visible, ...portalProps } = this.props;
    return visible && <Portal {...portalProps} />;
  }
}
