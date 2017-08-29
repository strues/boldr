// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import universal from 'react-universal-component';

// import type { ArticlesType } from '../../../../types/boldr';
import SETTINGS_QUERY from './gql/settings.graphql';

const UniversalSettings = universal(import('./Settings'));

type Props = {
  loading: boolean,
  error?: Object,
  settings: Array<Object>,
};

const Settings = ({ loading, error, settings }: Props) =>
  <UniversalSettings isLoading={loading} error={error} settings={settings} />;
// $FlowIssue
export default graphql(SETTINGS_QUERY, {
  // $FlowIssue
  options: () => ({
    fetchPolicy: 'cache-and-network',
  }),
  props: ({ data: { loading, error, settings } }) => ({
    loading,
    error,
    settings,
  }),
})(Settings);
