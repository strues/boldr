/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { Loader } from 'boldr-ui';
import { updateArticle, fetchArticleIfNeeded } from '../../../Blog/state';
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
    return (
      <ArticleEditor
        updateArticle={this.props.updateArticle}
        currentArticle={getArticleBySlug}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateArticle: postData => {
      dispatch(updateArticle(postData));
    },
    fetchArticleIfNeeded: slug => {
      dispatch(fetchArticleIfNeeded(slug));
    },
  };
};

const mapStateToProps = state => {
  return {
    postImage: state.admin.attachments.postImage,
  };
};
const ARTICLES_QUERY = gql`
  query getArticleBySlug($slug: String!) {
    getArticleBySlug(slug: $slug) {
      id,
      title,
      slug,
      featureImage,
      featured,
      backgroundImage,
      content,
      rawContent,
      published,
      createdAt,
      excerpt,
      userId,
      tags {
        id,
        name
      },
    }
  }
`;

const ArticleEditorContainerWithData = graphql(ARTICLES_QUERY, {
  options: props => ({
    variables: {
      slug: props.match.params.slug,
    },
  }),
})(ArticleEditorContainer);
// $FlowIssue
export default connect(mapStateToProps, mapDispatchToProps)(
  ArticleEditorContainerWithData,
);
