import React, { Component } from 'react';

export default (ComposedComponent) => {
  class Boldr extends Component {

    render() {
      return (
        <div>
          <ComposedComponent { ...this.props } />
        </div>
      );
    }
  }

  return Boldr;
};
