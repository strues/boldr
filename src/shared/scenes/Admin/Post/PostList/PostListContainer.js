/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostsIfNeeded, getPosts, deletePost } from '../../../Blog/state';
import type { ReactElement } from '../../../../types/react';
import PostList from './PostList';

type Props = {
  children?: ReactElement,
  posts: Array<Post>,
  dispatch: () => void,
  deletePost: Function,
  fetchPostsIfNeeded: () => void,
  handleDeleteClick: Function,
};

export class PostListContainer extends Component {
  static defaultProps: {
    profile: {},
    fetchPostsIfNeeded: () => {},
  };

  componentDidMount() {
    this.props.dispatch(fetchPostsIfNeeded());
  }

  props: Props;

  handleDeleteClick = (postId: string) => {
    this.props.dispatch(deletePost(postId));
  };

  render() {
    return (
      <PostList
        posts={this.props.posts}
        handleDeleteClick={this.handleDeleteClick}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: getPosts(state),
  };
};

export default connect(mapStateToProps)(PostListContainer);
