/**
 * @module boldr-core/lib/RegistryProvider
 */
import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import Registry from './registry';

/**
 * The provider is a JSX wrapper to inject the registry as a context var
 * You should never need to use this, it's an internal component
 */
export default class RegistryProvider extends Component {
  /**
   * @return {object} child with registry as only key
   */
  getChildContext() {
    return { registry: Registry.getRegistry() };
  }

  /**
   * react rendering
   * @return {object} ReactElement
   */
  render() {
    return Children.only(this.props.children);
  }
}

RegistryProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
RegistryProvider.childContextTypes = {
  registry: PropTypes.object,
};
