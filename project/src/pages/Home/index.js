// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import universal from 'react-universal-component';
import ARTICLES_QUERY from '../../scenes/Blog/gql/articles.graphql';
import type { ArticlesType } from '../../types/boldr';

const UniversalHome = universal(import('./Home'));

type Props = {
  loading: boolean,
  error?: Object,
  articles: ArticlesType,
};

const Home = ({ loading, error, articles }: Props) => (
  <UniversalHome isLoading={loading} error={error} articles={articles} />
);
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
})(Home);
