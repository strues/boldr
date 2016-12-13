/* @flow */
import React, { PureComponent } from 'react';
import { asyncConnect } from 'redux-connect';
import type { Post } from 'types/models';
import { fetchPostsIfNeeded, getPosts, deletePost } from 'state/dux/post';

import PostList from './PostList';

export type Props = {
  children?: ReactElement,
  posts: Array<Post>,
  dispatch?: () => void,
  deletePost: () => void,
  fetchPostsIfNeeded: () => void,
  handleArticleClick: () => void,
  handleDeleteClick: () => void,
};

export class PostListContainer extends PureComponent {
  constructor(props: Props) {
    super(props);
    (this: any).handleArticleClick = this.handleArticleClick.bind(this);
    (this: any).handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchPostsIfNeeded();
  }
  props: Props;
  // postId is a uuid, not an integer
  handleArticleClick(postId: string): void {

  }
  handleDeleteClick(postId: string): void {
    this.props.deletePost(postId);
  }
  render() {
    return (
      <PostList { ...this.props } />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: getPosts(state),
    loading: state.posts.loading,
  };
};
const asyncProps = [{
  promise: ({ store: { dispatch, getState } }) => dispatch(fetchPostsIfNeeded()),
}];

export default asyncConnect(asyncProps, mapStateToProps, { fetchPostsIfNeeded, deletePost })(PostListContainer);
