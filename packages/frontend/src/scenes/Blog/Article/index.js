// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import universal from 'react-universal-component';
import GET_ARTICLE_QUERY from '../gql/article.graphql';

const UniversalArticle = universal(import('./Article'));

type Props = {
  loading: boolean,
  error?: Object,
  getArticleBySlug: Object,
};

const Article = ({ loading, error, getArticleBySlug }: Props) => (
  <UniversalArticle isLoading={loading} error={error} article={getArticleBySlug} />
);

// $FlowIssue
export default graphql(GET_ARTICLE_QUERY, {
  options: props => ({
    variables: {
      slug: props.match.params.slug,
    },
  }),
  props: ({ data: { loading, error, getArticleBySlug } }) => ({
    loading,
    error,
    getArticleBySlug,
  }),
})(Article);
