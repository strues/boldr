import React, { Component } from 'react';

export default (ComposedComponent) => {
  class Boldr extends Component {
    componentDidMount() {
      console.log(`boldr theme wrapper mount. Current URL: ${this.getPageURL()}`);
    }
    getPageURL() {
      return (typeof(window) !== 'undefined') ? window.location.href : `http://localhost:3000/${this.props.pathname}`;
    }
    render() {
      return (
        <div>
          <ComposedComponent { ...this.props } url={ this.getPageURL() } />
        </div>
      );
    }
  }

  return Boldr;
};
