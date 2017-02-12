/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { Loader } from '../../../../components';
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
  updatePost: Function
};

@provideHooks({
  fetch: ({ dispatch, params: { slug } }) => dispatch(fetchPostFromSlug(slug)),
})
class PostEditorContainer extends Component {
  componentDidMount() {
    const slug = this.props.params.slug;
    this.props.fetchPostFromSlug(slug);
  }
  props: Props;

  render() {
    if (this.props.isFetching) {
      return (
        <Loader />
      );
    }
    return (
        <PostEditor
          currentPost={ this.props.currentPost }
        />
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    // posts: state.blog.posts,
    currentPost: state.blog.posts.currentPost,
    isFetching: state.blog.posts.isFetching,
    postImage: state.admin.attachments.postImage,
  };
};
export default connect(mapStateToProps, { fetchPostFromSlug })(PostEditorContainer);
