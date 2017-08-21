/* @flow */
// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { convertToHTML } from 'draft-convert';

import CREATE_ARTICLE_MUTATION from '../gql/createArticle.mutation.graphql';
import NewArticle from './NewArticle';
// $FlowIssue
const withMutation = graphql(CREATE_ARTICLE_MUTATION, {
  props: ({ mutate }) => ({
    createArticle: payload =>
      mutate({
        variables: {
          input: {
            ...payload,
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
    const payload = {
      title: values.title,
      slug: values.title,
      content: values.content,
      rawContent: values.rawContent,
      featured: false,
      published: values.published,
      excerpt: values.excerpt,
      image: values.image,
      tags: values.tags,
    };
    ownProps.createArticle(payload);
  },
});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(NewArticle));
