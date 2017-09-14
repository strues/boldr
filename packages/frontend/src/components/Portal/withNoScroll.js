import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getNodeFromSelector } from './util';

// Provides an HOC component for ensuring container is non-scrollable during component lifecycle.

export default function withNoScroll(Portal) {
  let portalVisibleCount = 0;
  let originalOverflow;

  return class NonScrollableWrapper extends Component {
    static propTypes = {
      selector: PropTypes.string,
      visible: PropTypes.bool,
    };

    static defaultProps = {
      selector: 'body',
    };

    componentDidMount() {
      if (this.props.visible) {
        this.saveStyle();
      }
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.visible !== nextProps.visible) {
        if (nextProps.visible === false) {
          this.restoreStyle();
        } else {
          this.saveStyle();
        }
      }
    }

    componentWillUnmount() {
      if (this.props.visible) {
        this.restoreStyle();
      }
    }
    restoreStyle() {
      portalVisibleCount--;

      if (portalVisibleCount <= 0) {
        const node = getNodeFromSelector(this.props.selector);
        node.style.overflow = originalOverflow;
      }
    }

    saveStyle() {
      portalVisibleCount++;

      if (portalVisibleCount === 1) {
        const node = getNodeFromSelector(this.props.selector);
        const { style } = node;
        originalOverflow = style.overflow;
        style.overflow = 'hidden';
      }
    }
    render() {
      return <Portal {...this.props} />;
    }
  };
}
