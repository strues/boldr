import React, { Component } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { fetchSettingsIfNeeded, getSettings } from '../../../state/modules/boldr/settings';
import type { Setting } from '../../../types/models';
import Settings from './Settings';

export type Props = {
  boldr?: Object,
  allSettings: Array<Setting>,
  fetchSettingsIfNeeded: () => void
};

@provideHooks({
  fetch: ({ dispatch }) => {
    return dispatch(fetchSettingsIfNeeded());
  },
})
export class SettingsContainer extends Component {
  componentDidMount() {
    this.props.fetchSettingsIfNeeded();
  }
  props: Props;
  render() {
    return (
      <Settings { ...this.props } />
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    allSettings: getSettings(state),
  };
};

export default connect(mapStateToProps, { fetchSettingsIfNeeded })(SettingsContainer);
