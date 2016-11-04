/* eslint-disable react/prefer-stateless-function */
/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { fetchPagesIfNeeded } from 'state/index';
import Pages from './Pages';

export type Props = {
  pages?: Object,
  fetchPagesIfNeeded: Function
};

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    promises.push(dispatch(fetchPagesIfNeeded()));
    return Promise.all(promises);
  },
}])
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
const mapStateToProps = (state, ownProps) => {
  return {
    pages: state.pages,
  };
};
export default connect(mapStateToProps, { fetchPagesIfNeeded })(PagesContainer);
