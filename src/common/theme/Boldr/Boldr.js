import React, { Component } from 'react';

export default (ComposedComponent) => {
  class Boldr extends Component {
    componentDidMount() {
      console.log('boldr theme wrapper mount');
    }
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
