/* eslint-disable react/prefer-stateless-function */
/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { fetchPagesIfNeeded, getPages } from 'state/index';
import Pages from './Pages';

export type Props = {
  pages?: Object,
  fetchPagesIfNeeded: Function
};

class PagesContainer extends Component {
  componentDidMount() {
    this.props.fetchPagesIfNeeded();
  }
  props: Props;
  render() {
    return (
      <Pages { ...this.props } />
    );
  }
}
const asyncProps = [{
  promise: ({ store: { dispatch, getState } }) => {
    dispatch(fetchPagesIfNeeded());
  },
}];

const mapStateToProps = (state, ownProps) => {
  return {
    pages: getPages(state),
  };
};
export default asyncConnect(asyncProps, mapStateToProps, { fetchPagesIfNeeded })(PagesContainer);
