/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchArticlesIfNeeded,
  getArticles,
  deletePost,
} from '../../../Blog/state';
import type { ReactElement } from '../../../../types/react';
import Articles from './Articles';

type Props = {
  children?: ReactElement,
  articles: Array<Article>,
  dispatch: () => void,
  deletePost: Function,
  fetchArticlesIfNeeded: () => void,
  handleDeleteClick: Function,
};

export class ArticlesContainer extends Component {
  static defaultProps: {
    profile: {},
    fetchArticlesIfNeeded: () => {},
  };

  componentDidMount() {
    this.props.dispatch(fetchArticlesIfNeeded());
  }

  props: Props;

  handleDeleteClick = (postId: string) => {
    this.props.dispatch(deletePost(postId));
  };

  render() {
    return (
      <Articles
        articles={this.props.articles}
        handleDeleteClick={this.handleDeleteClick}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: getArticles(state),
  };
};

export default connect(mapStateToProps)(ArticlesContainer);
