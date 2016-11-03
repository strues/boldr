import React, { Component } from 'react';
import boldrStyle from './boldrStyle';

export default (ComposedComponent) => {
  class Boldr extends Component {

    render() {
      return (
        <section style={ boldrStyle.theme }>
          <ComposedComponent { ...this.props } />
        </section>
      );
    }
  }

  return Boldr;
};
