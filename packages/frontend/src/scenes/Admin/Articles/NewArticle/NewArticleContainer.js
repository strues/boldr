/* @flow */
// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { convertToHTML } from 'draft-convert';

import CREATE_ARTICLE_MUTATION from '../gql/createArticle.mutation.graphql';
import NewArticle from './NewArticle';

const withMutation = graphql(CREATE_ARTICLE_MUTATION, {
  props: ({ mutate }) => ({
    createArticle: values =>
      mutate({
        variables: {
          input: {
            title: values.title,
            slug: values.title,
            content: convertToHTML(values.content),
            rawContent: values.rawContent,
            featured: values.featured,
            published: values.published,
            excerpt: values.excerpt,
            featureImage: values.featureImage,
            tags: values.tags,
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
  onSubmit: values => {
    ownProps.createArticle(values);
  },
});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(NewArticle));
