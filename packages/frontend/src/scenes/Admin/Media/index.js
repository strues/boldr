// @flow
import React from 'react';

import { graphql } from 'react-apollo';

import universal from 'react-universal-component';
import type { MediasType } from '../../../types/boldr';
import MEDIA_QUERY from './gql/getMedia.graphql';

const UniversalMedia = universal(import('./Media'));

type Props = {
  loading: boolean,
  error?: Object,
  getMedia: MediasType,
};

const Media = ({ loading, error, getMedia }: Props) =>
  <UniversalMedia isLoading={loading} error={error} media={getMedia} />;

// $FlowIssue
export default graphql(MEDIA_QUERY, {
  // $FlowIssue
  options: () => ({
    variables: {
      offset: 0,
      limit: 20,
    },
  }),
  props: ({ data: { loading, error, getMedia } }) => ({
    loading,
    error,
    getMedia,
  }),
})(Media);
