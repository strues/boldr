/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'boldr-ui';
import { updateArticle, fetchArticleIfNeeded } from '../../../Blog/state';
import ArticleEditor from './ArticleEditor';

export type Props = {
  dispatch: Function,
  fetchArticleIfNeeded: () => void,
  articles: Object,
  match: Object,
  currentArticle: Object,
  isFetching: boolean,
  ui: Object,
  updateArticle: Function,
};

class ArticleEditorContainer extends Component {
  componentDidMount() {
    const { fetchArticleIfNeeded, match: { params: { slug } } } = this.props;
    fetchArticleIfNeeded(slug);
  }
  props: Props;

  render() {
    if (this.props.isFetching) {
      return <Loader />;
    }
    return (
      <ArticleEditor
        updateArticle={this.props.updateArticle}
        currentArticle={this.props.currentArticle}
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
    // posts: state.blog.posts,
    currentArticle: state.blog.articles.currentArticle,
    isFetching: state.blog.articles.isFetching,
    postImage: state.admin.attachments.postImage,
  };
};
// $FlowIssue
export default connect(mapStateToProps, mapDispatchToProps)(
  ArticleEditorContainer,
);
