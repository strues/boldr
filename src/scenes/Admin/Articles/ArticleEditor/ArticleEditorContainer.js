/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import Loader from '@boldr/ui/Loader';
import GET_ARTICLE_QUERY from '../gql/article.graphql';
import ArticleEditor from './ArticleEditor';

export type Props = {
  dispatch: Function,
  match: Object,
  ui: Object,
  updateArticle: Function,
  data: Data,
};
type Data = {
  getArticleBySlug: Article,
  loading: boolean,
};
class ArticleEditorContainer extends Component {
  props: Props;
  render() {
    const { loading, getArticleBySlug } = this.props.data;
    if (loading) {
      return <Loader />;
    }
    return <ArticleEditor currentArticle={getArticleBySlug} />;
  }
}

// $FlowIssue
export default graphql(GET_ARTICLE_QUERY, {
  options: props => ({
    variables: {
      slug: props.match.params.slug,
    },
  }),
})(ArticleEditorContainer);
