/* @flow */
import React, { Component } from 'react';
import { asyncConnect } from 'redux-connect';
import { Grid } from 'components/index';
import { GRID, LIST } from 'core/config/layouts';
import { changeLayout } from 'state/dux/ui';
import { getPosts, fetchPostsIfNeeded } from '../../../state';
import type { Post } from '../../../types/models'; // eslint-disable-line
import PostListing from './PostListing';

export type Props = {
  posts: Array<Post>,
  loading: ?Boolean,
  fetchPosts: Function,
  ui: Object,
  changeLayout: () => void,
  handleChangeLayout: () => void,
};

class PostListingContainer extends Component {
  constructor() {
    super();
    (this: any).handleChangeLayout = this.handleChangeLayout.bind(this);
  }
  props: Props;
  handleChangeLayout() {
    this.props.ui.layout === 'grid' ?
    this.props.changeLayout(LIST) :
    this.props.changeLayout(GRID);
  }
  render() {
    return (
      <PostListing
        posts={ this.props.posts }
        layout={ this.props.ui.layout }
        handleChangeLayout={ this.handleChangeLayout }
      />
    );
  }
}

const asyncProps = [{
  promise: ({ store: { dispatch, getState } }) => dispatch(fetchPostsIfNeeded()),
}];

const mapStateToProps = (state) => {
  return {
    posts: getPosts(state),
    ui: state.ui,
  };
};

export default asyncConnect(asyncProps, mapStateToProps, { fetchPostsIfNeeded, changeLayout })(PostListingContainer);
