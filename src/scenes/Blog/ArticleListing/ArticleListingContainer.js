/* @flow */
import React, { Component } from 'react';
import { compose, gql, graphql } from 'react-apollo';
import Loader from '../../../components/Loader';
import withApolloFetchingContainer from '../../../components/ApolloFetching';
import View from '../../../components/View';
import ARTICLES_QUERY from './articles.graphql';
import ArticleListing from './ArticleListing';

export default compose(
  graphql(ARTICLES_QUERY, {
    options: props => ({
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
