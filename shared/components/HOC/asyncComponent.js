
import React from 'react';

/**
 * Simple wrapper component that gets its child element from a given
 *   promise-returning function
 * @param  {Function} getComponent Returns a Promise that resolves to a
 *   Component class
 * @return {Component}
 */
export default function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {

    state = { Component: null }

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          this.setState({ Component });
        });
      }
    }

    render() {
      return this.state.Component
        ? <this.state.Component { ...this.props } />
        : <h1>Loading...</h1>;
    }
  };
}
