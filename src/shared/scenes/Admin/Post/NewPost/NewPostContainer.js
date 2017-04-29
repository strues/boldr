/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import { uploadPostImage } from '../../state';
import { createPost } from '../../../Blog/state';
import NewPost from './NewPost';

type Props = {
  dispatch: Function,
  postImage: string,
  uploadPostImage: Function,
  createPost: Function,
};

class NewPostContainer extends Component {
  constructor() {
    super();
    (this: any).uploadImageForPost = this.uploadImageForPost.bind(this);
    (this: any).handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  uploadImageForPost(payload) {
    this.props.uploadPostImage(payload);
  }
  handleOnSubmit(values: Post) {
    const postData = {
      title: values.title,
      tags: values.tags,
      excerpt: values.excerpt,
      featureImage: this.props.postImage.url || values.featureImage,
      published: values.published,
      rawContent: values.content,
      content: draftToHtml(values.content),
      meta: values.meta,
    };
    this.props.createPost(postData);
  }
  props: Props;

  render() {
    return (
      <NewPost
        uploadImageForPost={this.uploadImageForPost}
        onFormSubmit={this.handleOnSubmit}
        postImage={this.props.postImage}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    postImage: state.admin.attachments.postImage,
    drawer: state.boldr.ui.drawer,
  };
};
export default connect(mapStateToProps, { createPost, uploadPostImage })(
  NewPostContainer,
);
