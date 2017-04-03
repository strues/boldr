/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostsIfNeeded, getPosts, deletePost } from '../../../../state/modules/blog/posts';
import type { ReactElement } from '../../../../types/react';
import VisiblePostList from './VisiblePostList';

type Props = {
  children?: ReactElement,
  posts: Array<Post>,
  dispatch: () => void,
  deletePost: Function,
  fetchPostsIfNeeded: Function,
  handleDeleteClick: Function,
};

export class PostListContainer extends Component {
  static fetchData(dispatch) {
    return Promise.all([dispatch(fetchPostsIfNeeded())]);
  }
  constructor(props: Props) {
    super(props);
    (this: any).handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    PostListContainer.fetchData(dispatch);
  }

  props: Props;

  handleDeleteClick(postId: string): void {
    this.props.dispatch(deletePost(postId));
  }
  render() {
    return <VisiblePostList posts={ this.props.posts } handleDeleteClick={ this.handleDeleteClick } />;
  }
}

const mapStateToProps = state => {
  return {
    posts: getPosts(state),
  };
};

export default connect(mapStateToProps)(PostListContainer);
