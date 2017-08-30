// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import universal from 'react-universal-component';
import CONTENT_TYPES_QUERY from './gql/contentTypes.graphql';

type Props = {
  loading: boolean,
  error?: Object,
  contentTypes: Array<Object>,
};

const UniversalContent = universal(import('./Content'));

const Content = ({ loading, error, contentTypes }: Props) => (
  <UniversalContent isLoading={loading} error={error} contentTypes={contentTypes} />
);

// $FlowIssue
export default graphql(CONTENT_TYPES_QUERY, {
  props: ({ data: { loading, error, contentTypes } }) => ({
    loading,
    error,
    contentTypes,
  }),
})(Content);
