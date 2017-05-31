/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
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

    this.props.onSubmit(values);
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

export const CREATE_ARTICLE_MUTATION = gql`
  mutation createArticle($article: CreateArticleInput!) {
    createArticle(article: $article) {
      title
      slug
      content
      rawContent
      featured
      published
      excerpt
      featureImage

    }
  }
`;
const withMutation = graphql(CREATE_ARTICLE_MUTATION, {
  props: ({ mutate }) => ({
    createArticle: values =>
      mutate({
        variables: {
          article: {
            title: values.title,
            slug: values.title,
            content: draftToHtml(values.content),
            rawContent: values.rawContent,
            featured: false,
            published: values.published,
            excerpt: values.excerpt,
            featureImage: values.featureImage,
            tags: values.tags,
          },
        },
      }),
  }),
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  uploadArticleImage: () => dispatch(uploadArticleImage()),
  onSubmit: values => {
    ownProps.createArticle(values).then(res => {}).catch(error => {});
  },
});

export default withMutation(
  connect(mapStateToProps, mapDispatchToProps)(NewArticleContainer),
);
