/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import draftToHtml from 'draftjs-to-html';

import { createPost } from '../../../../state/modules/blog/posts';
import NewPost from './NewPost';

type Props = {
  dispatch: Function,
  postImage: string,
  createPost: Function,
};

// @TODO: refactor this because its poorly done
class NewPostContainer extends Component {
  constructor() {
    super();

    (this: any).handleOnSubmit = this.handleOnSubmit.bind(this);
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
    return <NewPost onFormSubmit={ this.handleOnSubmit } postImage={ this.props.postImage } />;
  }
}

const mapStateToProps = state => {
  return {
    postImage: state.attachments.postImage,
    drawer: state.boldr.ui.drawer,
  };
};
export default connect(mapStateToProps, { createPost })(NewPostContainer);
