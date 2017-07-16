/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql } from 'react-apollo';
import Loader from '@boldr/ui/Loader';
// internal
import { setArticle } from '../../state/dashboard/actions';
import ARTICLES_QUERY from '../gql/articles.graphql';
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

const ArticlesContainerWithData = graphql(ARTICLES_QUERY, {
  options: () => ({
    variables: {
      offset: 0,
      limit: 20,
    },
  }),
})(ArticlesContainer);

function mapDispatchToProps(dispatch) {
  return {
    setArticle: bindActionCreators({ setArticle }, dispatch),
  };
}

export default connect(mapDispatchToProps)(ArticlesContainerWithData);
