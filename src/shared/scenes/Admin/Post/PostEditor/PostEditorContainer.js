/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'boldr-ui';
import { updatePost, fetchPostIfNeeded } from '../../../Blog/state';
import PostEditor from './PostEditor';

export type Props = {
  dispatch: Function,
  fetchPostIfNeeded: () => void,
  posts: Object,
  match: Object,
  currentPost: Object,
  isFetching: Boolean,
  ui: Object,
  updatePost: Function,
};

class PostEditorContainer extends Component {
  componentDidMount() {
    const { fetchPostIfNeeded, match: { params: { slug } } } = this.props;
    fetchPostIfNeeded(slug);
  }
  props: Props;

  render() {
    if (this.props.isFetching) {
      return <Loader />;
    }
    return (
      <PostEditor
        updatePost={this.props.updatePost}
        currentPost={this.props.currentPost}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePost: postData => {
      dispatch(updatePost(postData));
    },
    fetchPostIfNeeded: slug => {
      dispatch(fetchPostIfNeeded(slug));
    },
  };
};

const mapStateToProps = state => {
  return {
    // posts: state.blog.posts,
    currentPost: state.blog.posts.currentPost,
    isFetching: state.blog.posts.isFetching,
    postImage: state.admin.attachments.postImage,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  PostEditorContainer,
);
