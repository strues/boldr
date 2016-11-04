/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { getPosts, fetchPosts } from '../../../state';
import type { Post } from '../../../types/models'; // eslint-disable-line
import PostListing from './PostListing';

export type Props = {
  posts: Array<Post>,
  loading: ?Boolean,
  fetchPosts: Function
};

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    promises.push(dispatch(fetchPosts()));
    return Promise.all(promises);
  },
}])
class PostListingContainer extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  props: Props;
  render() {
    return (
      <PostListing posts={ this.props.posts } />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: getPosts(state),
  };
};

export default connect(mapStateToProps, { fetchPosts })(PostListingContainer);
