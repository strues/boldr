// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import universal from 'react-universal-component';

import type { TagsType } from '../../../types/boldr';
import TAGS_QUERY from './gql/tags.graphql';

const UniversalTags = universal(import('./Tags'));

type Props = {
  loading: boolean,
  error?: Object,
  getTags: TagsType,
};

const Tags = ({ loading, error, getTags }: Props) => (
  <UniversalTags isLoading={loading} error={error} tags={getTags} />
);
// $FlowIssue
export default graphql(TAGS_QUERY, {
  // $FlowIssue
  options: () => ({
    variables: {
      offset: 0,
      limit: 20,
    },
  }),
  props: ({ data: { loading, error, getTags } }) => ({
    loading,
    error,
    getTags,
  }),
})(Tags);
