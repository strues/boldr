/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { convertToHTML } from 'draft-convert';
import { createArticle } from '../../../Blog/state';
import NewArticle from './NewArticle';

type Props = {
  dispatch: Function,
  postImage: string,
  onSubmit: Function,
  uploadArticleImage: Function,
  createArticle: Function,
};

class NewArticleContainer extends Component {
  constructor() {
    super();
    (this: any).handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(values: Article) {
    const payload = {
      title: values.title,
      slug: values.title,
      content: convertToHTML(values.content),
      rawContent: values.rawContent,
      featured: false,
      published: values.published,
      excerpt: values.excerpt,
      featureImage: `/uploads/media/${this.props.featImage}`,
      tags: values.tags,
    };
    console.log(payload)
    this.props.onSubmit(payload);
  }
  props: Props;

  render() {
    return <NewArticle onFormSubmit={this.handleOnSubmit} />;
  }
}

export const CREATE_ARTICLE_MUTATION = gql`
  mutation createArticle($input: CreateArticleInput!) {
    createArticle(input: $input) {
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
    createArticle: (payload, ownProps) =>
      mutate({
        variables: {
          input: {
            title: payload.title,
            slug: payload.title,
            content: payload.content,
            rawContent: payload.rawContent,
            featured: payload.featured,
            published: payload.published,
            excerpt: payload.excerpt,
            featureImage: payload.featureImage,
            tags: payload.tags,
          },
        },
      }),
  }),
});

const mapStateToProps = state => {
  return {
    featImage: state.admin.media.currentMedia.uploadMedia.name,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: payload => {
    ownProps.createArticle(payload);
  },
});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(NewArticleContainer));
