// @flow
import React from 'react';

import { graphql } from 'react-apollo';

import universal from 'react-universal-component';
import type { MediaType } from '../../../../types/boldr';
import MEDIA_BY_ID_QUERY from '../gql/mediaById.graphql';

const UniversalMediaManager = universal(import('./MediaManager'));

type Props = {
  loading: boolean,
  error?: Object,
  getMediaById: MediaType,
};

const MediaManager = ({ loading, error, getMediaById }: Props) => (
  <UniversalMediaManager isLoading={loading} error={error} media={getMediaById} />
);

// $FlowIssue
export default graphql(MEDIA_BY_ID_QUERY, {
  options: props => ({
    variables: {
      id: props.match.params.id,
    },
  }),
  props: ({ data: { loading, error, getMediaById } }) => ({
    loading,
    error,
    getMediaById,
  }),
})(MediaManager);
