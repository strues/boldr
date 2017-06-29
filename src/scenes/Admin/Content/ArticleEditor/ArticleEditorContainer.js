/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import Loader from '@boldr/ui/Loader';
import ArticleEditor from './ArticleEditor';
import GET_ARTICLE_QUERY from './article.graphql';

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

const mapStateToProps = state => {
  return {
    postImage: state.admin.attachments.postImage,
  };
};

const ArticleEditorContainerWithData = graphql(GET_ARTICLE_QUERY, {
  options: props => ({
    variables: {
      slug: props.match.params.slug,
    },
  }),
})(ArticleEditorContainer);
// $FlowIssue
export default connect(mapStateToProps, null)(ArticleEditorContainerWithData);
