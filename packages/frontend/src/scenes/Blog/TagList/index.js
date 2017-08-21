// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import universal from 'react-universal-component';
import ARTICLES_FOR_TAG from '../gql/articlesForTag.graphql';

const UniversalTagList = universal(import('./TagList'));

type Props = {
  loading: boolean,
  error?: Object,
  getArticlesForTag: Array<Object>,
  match: Object,
};

const TagList = ({ loading, error, match, getArticlesForTag }: Props) =>
  <div>
    <UniversalTagList
      isLoading={loading}
      error={error}
      match={match}
      articles={getArticlesForTag}
    />
  </div>;

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
