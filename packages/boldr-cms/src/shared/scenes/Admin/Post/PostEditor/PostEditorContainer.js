/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'boldr-ui';
import { updatePost, fetchPostFromSlug } from '../../../../state/modules/blog/posts';
import EditPostForm from './components/EditPostForm';
import PostEditor from './PostEditor';

export type Props = {
  dispatch: Function,
  fetchPostFromSlug: Function,
  posts: Object,
  params: Object,
  currentPost: Object,
  isFetching: Boolean,
  ui: Object,
  updatePost: Function,
};

class PostEditorContainer extends Component {
  static fetchData(dispatch, params) {
    return Promise.all([dispatch(fetchPostFromSlug(params.slug))]);
  }
  componentDidMount() {
    const { dispatch, params } = this.props;

    // Fetching data for client side rendering
    PostEditorContainer.fetchData(dispatch, params);
  }

  props: Props;

  render() {
    if (this.props.isFetching) {
      return <Loader />;
    }
    return <PostEditor currentPost={ this.props.currentPost } />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // posts: state.blog.posts,
    currentPost: state.blog.posts.currentPost,
    isFetching: state.blog.posts.isFetching,
    postImage: state.attachments.postImage,
  };
};
export default connect(mapStateToProps)(PostEditorContainer);
