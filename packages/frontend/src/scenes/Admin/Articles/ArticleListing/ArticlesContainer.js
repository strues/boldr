/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql, compose, withApollo } from 'react-apollo';
import Loader from '@boldr/ui/Loader';
// internal
import { setArticle } from '../../state/dashboard/actions';
import ARTICLES_QUERY from '../gql/articles.graphql';
import DELETE_ARTICLE_MUTATION from '../gql/deleteArticle.mutation.graphql';
import Articles from './Articles';

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

  handleClick = article => {
    this.props.dispatch(setArticle(article));
  };
  handleDeleteClick = id => {
    console.log('click', id);
    this.props.deleteArticle(id);
  };
  render() {
    const { loading, articles } = this.props.data;
    if (loading) {
      return <Loader />;
    } else {
      return (
        <Articles
          articles={articles}
          handleDeleteClick={this.handleDeleteClick}
          handleClick={this.handleClick}
        />
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setArticle: bindActionCreators({ setArticle }, dispatch),
  };
}
export default compose(
  withApollo,
  graphql(ARTICLES_QUERY, {
    // $FlowIssue
    options: () => ({
      variables: {
        offset: 0,
        limit: 20,
      },
    }),
  }),
  connect(mapDispatchToProps),
)(ArticlesContainer);
