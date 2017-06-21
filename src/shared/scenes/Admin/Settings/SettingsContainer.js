/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql, gql } from 'react-apollo';
// internal
import Loader from '@@components/Loader';
import { selectSettings, selectSettingFromList } from '../../../state/modules/boldr/settings';
import Settings from './Settings';

type Props = {
  data: Data,
};
type Data = {
  getSettings: Array<Setting>,
  loading: boolean,
};

const SettingsContainer = (props: Props) => {
  const { loading, getSettings } = props.data;
  if (loading) {
    return <Loader />;
  }
  return <Settings settings={getSettings} />;
};

export const SETTINGS_QUERY = gql`
  query {
    getSettings {
      id,
      key,
      value,
      label,
      description,
    }
  }
`;

export default graphql(SETTINGS_QUERY, {
  options: () => ({
    fetchPolicy: 'cache-and-network',
  }),
})(SettingsContainer);
