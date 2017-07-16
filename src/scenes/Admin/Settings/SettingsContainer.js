/* @flow */
import React from 'react';
import { graphql } from 'react-apollo';
// internal
import Loader from '@boldr/ui/Loader';
import Settings from './Settings';
import SETTINGS_QUERY from './settings.graphql';

type Props = {
  data: Data,
};
interface Data {
  settings: Array<Setting>,
  loading: boolean,
}

const SettingsContainer = (props: Props) => {
  const { loading, settings } = props.data;
  if (loading) {
    return <Loader />;
  }
  return <Settings settings={settings} />;
};

export default graphql(SETTINGS_QUERY, {
  options: () => ({
    fetchPolicy: 'cache-and-network',
  }),
})(SettingsContainer);
