// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import universal from 'react-universal-component';
import ARTICLES_FOR_TAG from '../gql/articlesForTag.graphql';
import type { ArticlesType, MatchParams } from '../../../types/boldr';

const UniversalTagList = universal(import('./TagList'));

type Props = {
  loading: boolean,
  error?: Object,
  getArticlesForTag: ArticlesType,
  match: MatchParams,
};

const TagList = ({ loading, error, match, getArticlesForTag }: Props) =>
  <UniversalTagList isLoading={loading} error={error} match={match} articles={getArticlesForTag} />;

// $FlowIssue
export default graphql(ARTICLES_FOR_TAG, {
  options: props => ({
    variables: {
      name: props.match.params.name,
    },
  }),
  props: ({ ownProps: { match }, data: { loading, error, getArticlesForTag } }) => ({
    loading,
    error,
    match,
    getArticlesForTag,
  }),
})(TagList);
