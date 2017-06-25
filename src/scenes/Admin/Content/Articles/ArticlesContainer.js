/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
// internal
import Loader from '@@components/Loader';
import { deletePost } from '../../../Blog/state';
import Articles from './Articles';

type Data = {
  getArticles: Array<Article>,
  loading: boolean,
};

type Props = {
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
    const { loading, getArticles } = this.props.data;
    if (loading) {
      return <Loader />;
    } else {
      return <Articles articles={getArticles} handleDeleteClick={this.handleDeleteClick} />;
    }
  }
}

const ARTICLES_QUERY = gql`
  query getArticles($offset: Int!, $limit: Int!) {
    getArticles(offset: $offset, limit: $limit) {
      id,
      title,
      slug,
      featureImage,
      featured,
      backgroundImage,
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

const ArticlesContainerWithData = graphql(ARTICLES_QUERY, {
  options: () => ({
    variables: {
      offset: 0,
      limit: 20,
    },
  }),
})(ArticlesContainer);
export default connect()(ArticlesContainerWithData);
