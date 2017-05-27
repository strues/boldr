/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql, gql } from 'react-apollo';
import { Loader } from 'boldr-ui';
import {
  selectSettings,
  selectSettingFromList,
} from '../../../state/modules/boldr/settings';
import Settings from './Settings';

type Props = {
  data: Data,
};
type Data = {
  getSettings: Array<Setting>,
  loading: boolean,
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

@graphql(SETTINGS_QUERY)
export default class SettingsContainer extends Component {
  props: Props;
  render() {
    const { loading, getSettings } = this.props.data;
    if (loading) {
      return <Loader />;
    }
    return <Settings settings={getSettings} />;
  }
}
