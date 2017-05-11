/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import { uploadArticleImage } from '../../state';
import { createArticle } from '../../../Blog/state';
import NewArticle from './NewArticle';

type Props = {
  dispatch: Function,
  postImage: string,
  uploadArticleImage: Function,
  createArticle: Function,
};

class NewArticleContainer extends Component {
  constructor() {
    super();
    (this: any).uploadImageForArticle = this.uploadImageForArticle.bind(this);
    (this: any).handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  uploadImageForArticle(payload) {
    this.props.uploadArticleImage(payload);
  }
  handleOnSubmit(values: Article) {
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
    this.props.createArticle(postData);
  }
  props: Props;

  render() {
    return (
      <NewArticle
        uploadImageForArticle={this.uploadImageForArticle}
        onFormSubmit={this.handleOnSubmit}
        postImage={this.props.postImage}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    postImage: state.admin.attachments.postImage,
  };
};
export default connect(mapStateToProps, { createArticle, uploadArticleImage })(
  NewArticleContainer,
);
