/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import Loader from '@boldr/ui/Loader';
// internal
import { deletePost } from '../../../Blog/state';
import Articles from './Articles';
import ARTICLES_QUERY from './articles.graphql';

type Data = {
  articles: Array<Article>,
  loading: boolean,
};

export type Props = {
  dispatch: () => void,
  deletePost: Function,
  data: Data,
  handleDeleteClick: Function,
};

export class ArticlesContainer extends Component {
  props: Props;

  handleDeleteClick = (postId: string) => {
    this.props.dispatch(deletePost(postId));
  };

  render() {
    const { loading, articles } = this.props.data;
    if (loading) {
      return <Loader />;
    } else {
      return <Articles articles={articles} handleDeleteClick={this.handleDeleteClick} />;
    }
  }
}

const ArticlesContainerWithData = graphql(ARTICLES_QUERY, {
  options: () => ({
    variables: {
      offset: 0,
      limit: 20,
    },
  }),
})(ArticlesContainer);
export default connect()(ArticlesContainerWithData);
