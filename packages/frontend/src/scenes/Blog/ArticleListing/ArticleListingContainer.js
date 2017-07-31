/* @flow */
import React from 'react';
import { compose, graphql } from 'react-apollo';
import Loader from '@boldr/ui/Loader';
import View from '@boldr/ui/View';
// internal
import withApolloFetchingContainer from '../../../components/ApolloFetching';
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
