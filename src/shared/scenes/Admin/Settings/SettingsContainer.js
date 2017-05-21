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
  settings: Array<Setting>,
  loading: boolean,
};
export const SETTINGS_QUERY = gql`
query {
    settings {
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
    const { loading, settings } = this.props.data;
    if (loading) {
      return <Loader />;
    }
    return <Settings settings={settings} />;
  }
}
