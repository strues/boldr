/* eslint-disable react/prefer-stateless-function */
/* @flow */
import React, { Component } from 'react';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { fetchPagesIfNeeded, getPages } from 'state/modules/boldr/pages';
import Pages from './Pages';

export type Props = {
  pages?: Object,
  fetchPagesIfNeeded: Function
};

@provideHooks({
  fetch: ({ dispatch }) => {
    return dispatch(fetchPagesIfNeeded());
  },
})
export class PagesContainer extends Component {
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
    pages: getPages(state),
  };
};
export default connect(mapStateToProps, { fetchPagesIfNeeded })(PagesContainer);
