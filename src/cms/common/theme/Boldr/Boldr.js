import React, { Component } from 'react';


export default (ComposedComponent) => {
  class Boldr extends Component {

    render() {
      return (
        <section className="boldr__theme">
          <ComposedComponent { ...this.props } />
        </section>
      );
    }
  }

  return Boldr;
};
