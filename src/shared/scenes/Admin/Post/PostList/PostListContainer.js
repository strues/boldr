/* @flow */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  fetchPostsIfNeeded,
  getPosts,
  deletePost,
} from '../../../../state/modules/blog/posts';
import type {ReactElement} from '../../../../types/react';
import VisiblePostList from './VisiblePostList';

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
  constructor(props: Props) {
    super(props);
    (this: any).handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(fetchPostsIfNeeded());
  }

  props: Props;

  handleDeleteClick(postId: string): void {
    this.props.dispatch(deletePost(postId));
  }
  render() {
    return (
      <VisiblePostList
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
