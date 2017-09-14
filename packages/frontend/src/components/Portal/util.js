import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import isFunction from 'lodash.isfunction';
import cN from 'classnames';

function createContainerNode(parent) {
  const div = document.createElement('div');
  return parent.appendChild(div);
}

function removeNodeFromDOMTree(node) {
  const { parentNode } = node;
  if (parentNode) {
    parentNode.removeChild(node);
  }
}

export function getNodeFromSelector(selector) {
  const node = typeof selector === 'string' ? document.querySelector(selector) : selector;
  return node || document.body;
}

export function prepareNode(node, prefix, className, css) {
  node.className = cN(`${prefix}-portal`, className);
  node.style.cssText = Object.keys(css || {})
    .map(k => `${k}: ${css[k]}`)
    .join('; ');
}

export function openPortal(props) {
  // eslint-disable-next-line
  props = props || this.props;

  // ensure that the container exists, this container is necessary,
  // because React render will cover all the things under this node.
  // eslint-disable-next-line
  let node = this.node;
  if (!node) {
    const { selector, prefix, className, css } = props;
    const parentNode = getNodeFromSelector(selector);
    // eslint-disable-next-line
    this.node = node = createContainerNode(parentNode);
    prepareNode(node, prefix, className, css);
  }
  // eslint-disable-next-line
  // props.onOpen(this.node);
  // Although this API is unstable, it can only use the portal. The use of ReactDOM.render will lead to
  // context failure.
  const { children, onUpdate } = props;
  // eslint-disable-next-line
  ReactDOM.unstable_renderSubtreeIntoContainer(this, Children.only(children), node, onUpdate);
}

export function destroyPortal(callback, props) {
  // eslint-disable-next-line
  const node = this.node;
  // eslint-disable-next-line
  props = props || this.props;
  if (node) {
    if (props.beforeClose) {
      props.beforeClose(
        node,
        setTimeout(() => {
          ReactDOM.unmountComponentAtNode(node);
          removeNodeFromDOMTree(node);
          // eslint-disable-next-line
          this.node = undefined;
          // eslint-disable-next-line
          isFunction(callback) && callback();
        }, 0),
      );
    } else {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(node);
        removeNodeFromDOMTree(node);
        // eslint-disable-next-line
        this.node = undefined;
        // eslint-disable-next-line
        isFunction(callback) && callback();
      }, 0);
    }
    // React does not support the unmount component in the event handler, which can cause problems.
    // Portal usage scenarios are prone to occur
    // This situation, such as inside the portal press the close button to turn off the portal.
    // The purpose of setTimeout is to put unmount into the next tick
    // to do it.
    //
    // Invariant Violation: React DOM tree root should always have a node reference.
    // https://github.com/facebook/react/issues/2605
    // https://github.com/facebook/react/issues/3298
  }
}
