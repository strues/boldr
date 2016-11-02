/* @flow */

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import type { ReactElement } from '../../types/react';
import { Notifications } from '../../components/index';
import { areSettingsLoaded, arePagesLoaded, getSettings } from '../../state/selectors';
import { fetchSettingsIfNeeded, fetchPagesIfNeeded } from '../../state/dux/boldr/actions';
import meta from '../../core/config/base';
import '../../styles/main.scss';

type Props = {
  children: ReactElement,
  fetchSettingsIfNeeded: Function,
  fetchPagesIfNeeded: Function,
  settings: Object
};

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    if (!areSettingsLoaded(getState())) {
      promises.push(dispatch(fetchSettingsIfNeeded()));
    }
    if (!arePagesLoaded(getState())) {
      promises.push(dispatch(fetchPagesIfNeeded()));
    }
    return Promise.all(promises);
  }
}])
class BoldrWrapper extends Component {
  componentDidMount() {
    this.props.fetchSettingsIfNeeded();
    this.props.fetchPagesIfNeeded();
  }
  props: Props;
  render() {
    return (
      <div>
        <Helmet { ...meta.boldr } script={ [] } />
        { this.props.children }
        <Notifications />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    boldr: state.boldr,
    settings: getSettings(state),
    auth: state.auth,
    notifications: state.notifications
  };
}

export default connect(mapStateToProps, { fetchSettingsIfNeeded, fetchPagesIfNeeded })(BoldrWrapper);
