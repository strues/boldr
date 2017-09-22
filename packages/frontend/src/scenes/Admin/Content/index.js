// @flow
import * as React from 'react';
import { graphql, compose } from 'react-apollo';
import universal from 'react-universal-component';
import CONTENT_ROOT_QUERY from './gql/contentRoot.graphql';

type Props = {
  loading: boolean,
  error?: Object,
  contentRoot: Object,
};

const UniversalContent = universal(import('./Content'));

const Content = ({ loading, error, contentRoot }: Props) => (
  <UniversalContent isLoading={loading} error={error} content={contentRoot} />
);

// $FlowIssue
export default graphql(CONTENT_ROOT_QUERY, {
  props: ({ data: { loading, error, contentRoot } }) => ({
    loading,
    error,
    contentRoot,
  }),
})(Content);
