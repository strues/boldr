/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updatePost } from '../../../../state/modules/blog/posts';
import { PostEditorForm } from '../components';

export type Props = {
  dispatch: Function,
  posts: Object,
  params: Object,
  currentPost: Object,
  drawer: boolean,
  ui: Object,
  updatePost: Function
};

class PostEditor extends Component {
  constructor(props: Props) {
    super(props);
    (this: any).handleSubmit = this.handleSubmit.bind(this);
  }
  state: Object = {
    editing: true,
  };

  props: Props;
  handleSubmit(values) {
    const newPostData = {
      title: values.title,
      tags: values.tags,
      status: values.status,
      content: values.content,
      excerpt: values.excerpt,
      id: this.props.currentPost.id || '',
    };

    const editPostData = {
      title: values.title,
      status: values.status,
      content: values.content,
      excerpt: values.excerpt,
      id: this.props.currentPost.id || '',
    };

    const postData = this.state.editing ? editPostData : newPostData;

    console.log('submit', postData);
    this.props.updatePost(postData);
  }

  render() {
    return (
      <div>
        <PostEditorForm
          initialValues={ this.props.currentPost }
          postImage={ this.props.postImage }
          onSubmit={ this.handleSubmit }
          drawer={ this.props.drawer }
          isEditing
        />
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    // posts: state.blog.posts,
    currentPost: state.blog.posts.currentPost,
    drawer: state.boldr.ui.drawer,
    postImage: state.admin.attachments.postImage,
  };
};
export default connect(mapStateToProps, { updatePost })(PostEditor);
