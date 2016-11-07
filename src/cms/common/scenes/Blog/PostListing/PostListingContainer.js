/* @flow */
import React, { Component } from 'react';
import { asyncConnect } from 'redux-connect';
import { getPosts, fetchPosts } from '../../../state';
import type { Post } from '../../../types/models'; // eslint-disable-line
import PostListing from './PostListing';

export type Props = {
  posts: Array<Post>,
  loading: ?Boolean,
  fetchPosts: Function
};


class PostListingContainer extends Component {
  props: Props;
  render() {
    return (
      <PostListing posts={ this.props.posts } />
    );
  }
}

const asyncProps = [{
  promise: ({ store: { dispatch, getState } }) => dispatch(fetchPosts()),
}];

const mapStateToProps = (state) => {
  return {
    posts: getPosts(state),
  };
};

export default asyncConnect(asyncProps, mapStateToProps, { fetchPosts })(PostListingContainer);
