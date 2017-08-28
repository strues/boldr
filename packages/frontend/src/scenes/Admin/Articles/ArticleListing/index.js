// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import universal from 'react-universal-component';

import type { ListOfArticles } from '../../../../types/boldr';
import ARTICLES_QUERY from '../gql/articles.graphql';

const UniversalArticles = universal(import('./Articles'));

type Props = {
  loading: boolean,
  error?: Object,
  articles: ListOfArticles,
};

const ArticleListing = ({ loading, error, articles }: Props) =>
  <div>
    <UniversalArticles isLoading={loading} error={error} articles={articles} />
  </div>;

// $FlowIssue
export default graphql(ARTICLES_QUERY, {
  // $FlowIssue
  options: () => ({
    variables: {
      offset: 0,
      limit: 20,
    },
  }),
  props: ({ data: { loading, error, articles } }) => ({
    loading,
    error,
    articles,
  }),
})(ArticleListing);
