// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import universal from 'react-universal-component';
import ARTICLES_QUERY from '../gql/articles.graphql';

const UniversalArticleListing = universal(import('./ArticleListing'));

type Props = {
  loading: boolean,
  error?: Object,
  articles: Array<Article>,
};

const ArticleListing = ({ loading, error, articles }: Props) =>
  <div>
    <UniversalArticleListing isLoading={loading} error={error} articles={articles} />
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
