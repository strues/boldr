/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';

type Props = {
  pathname: string,
  auth: Object,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

@connect(mapStateToProps)
export default (ComposedComponent: any) => {
  class Boldr extends Component {
    props: Props;

    getPageURL() {
      return (typeof(window) !== 'undefined')
      ? window.location.href
      : `http://localhost:3000/${this.props.pathname}`;
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
