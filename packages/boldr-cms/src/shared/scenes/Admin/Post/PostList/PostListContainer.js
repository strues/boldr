/* @flow */
import React, { PureComponent } from 'react';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import type { ReactElement } from '../../../../types/react';
import type { Post } from '../../../../types/models';
import { fetchPostsIfNeeded, getPosts, deletePost } from '../../../../state/modules/blog/posts';

import PostList from './PostList';

type Props = {
  children?: ReactElement,
  posts: Array<Post>,
  dispatch?: () => void,
  deletePost: Function,
  fetchPostsIfNeeded: Function,
  handleDeleteClick: Function,
};

@provideHooks({
  fetch: ({ dispatch }) => {
    return dispatch(fetchPostsIfNeeded());
  },
})
export class PostListContainer extends PureComponent {
  constructor(props: Props) {
    super(props);
    (this: any).handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchPostsIfNeeded();
  }
  props: Props;

  handleDeleteClick(postId: string): void {
    this.props.deletePost(postId);
  }
  render() {
    return (
      <PostList posts={ this.props.posts } handleDeleteClick={ this.handleDeleteClick } />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: getPosts(state),
  };
};

export default connect(mapStateToProps, { fetchPostsIfNeeded, deletePost })(PostListContainer);
