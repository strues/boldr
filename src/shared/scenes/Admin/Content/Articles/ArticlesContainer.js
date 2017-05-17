/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { Loader } from 'boldr-ui';
import { deletePost } from '../../../Blog/state';
import Articles from './Articles';

type Data = {
  articles: Array<Article>,
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
    if (this.props.data.loading) {
      return <Loader />;
    }
    return (
      <Articles
        articles={this.props.data.articles}
        handleDeleteClick={this.handleDeleteClick}
      />
    );
  }
}

const ARTICLES_QUERY = gql`
  query articles($offset: Int!, $limit: Int!) {
    articles(offset: $offset, limit: $limit) {
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
