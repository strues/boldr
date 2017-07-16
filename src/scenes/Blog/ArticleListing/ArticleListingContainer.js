/* @flow */
import React from 'react';
import { compose, graphql } from 'react-apollo';
import Loader from '../../../components/Loader';
import withApolloFetchingContainer from '../../../components/ApolloFetching';
import View from '../../../components/View';
import ARTICLES_QUERY from '../gql/articles.graphql';
import ArticleListing from './ArticleListing';

export default compose(
  graphql(ARTICLES_QUERY, {
    options: () => ({
      variables: {
        offset: 0,
        limit: 20,
      },
    }),
  }),
  withApolloFetchingContainer(() =>
    <View marginChildren>
      <Loader />
    </View>,
  ),
)(ArticleListing);
