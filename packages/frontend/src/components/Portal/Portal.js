import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import * as util from './util';

export default class Portal extends Component {
  static propTypes = {
    // eslint-disable-next-line
    children: PropTypes.node.isRequired,
    beforeClose: PropTypes.func,
    onUpdate: PropTypes.func,
    onOpen: PropTypes.func,
    selector: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    className: PropTypes.string,
    css: PropTypes.object,
    prefix: PropTypes.string,
  };

  static defaultProps = {
    selector: 'body',
    className: '',
    css: {},
    prefix: 'boldr',
  };

  componentDidMount() {
    util.openPortal.call(this);
  }

  componentWillReceiveProps(nextProps) {
    // If the selector is changed, delete and reopen it
    const { selector } = this.props;
    if (selector !== nextProps.selector) {
      // componentDidUpdate will handle the rest
      this.pendingDestroy = true;
      return;
    }

    // If the children are changed, re-render directly, react will determine if there is an update (even if this is the root node).
    // this is also done in componentDidUpdate.

    // other cases only update the style
    const { className, prefix, css } = this.props;
    if (
      className !== nextProps.className ||
      prefix !== nextProps.prefix ||
      !isEqual(css, nextProps.css)
    ) {
      util.prepareNode(this.node, nextProps.prefix, nextProps.className, nextProps.css);
    }
  }

  componentDidUpdate() {
    if (this.pendingDestroy) {
      // destroyPortal is asynchronous (the reason to see destroyPortal code), so callback form call openPortal
      util.destroyPortal.call(this, () => {
        this.pendingDestroy = false;
        util.openPortal.call(this);
      });
    } else {
      util.openPortal.call(this);
    }
  }

  componentWillUnmount() {
    util.destroyPortal.call(this);
  }
  render() {
    return null;
  }
}
