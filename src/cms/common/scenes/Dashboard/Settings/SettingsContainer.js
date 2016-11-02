import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { fetchSettingsIfNeeded, getSettings } from 'state/index';
import Settings from './Settings';

export type Props = {
  boldr?: Object,
  allSettings: Array<Object>,
  fetchSettingsIfNeeded: () => void
};

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    promises.push(dispatch(fetchSettingsIfNeeded()));
    return Promise.all(promises);
  }
}])
class SettingsContainer extends Component {
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
    allSettings: getSettings(state)
  };
};

export default connect(mapStateToProps, { fetchSettingsIfNeeded })(SettingsContainer);
