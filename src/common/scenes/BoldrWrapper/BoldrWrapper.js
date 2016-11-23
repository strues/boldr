/* @flow */

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect';
import type { ReactElement } from '../../types/react';
import { Notifications } from '../../components/index';
import {
  areSettingsLoaded,
  arePagesLoaded,
  getSettings,
  isNavLoaded,
  fetchSettingsIfNeeded,
  fetchPagesIfNeeded,
  loadMainNavIfNeeded,
  getByLabel,
} from '../../state/index';

import meta from '../../core/config/base';
// $FlowIssue
import '../../theme/styles/main.scss';

type Props = {
  children: ReactElement,
  fetchSettingsIfNeeded: Function,
  isNavLoaded: () => void,
  loadMainNav: () => void,
  fetchPagesIfNeeded: Function,
  loadMainNavIfNeeded: Function,
  settings: Object
};

class BoldrWrapper extends Component {
  componentDidMount() {
    this.props.fetchSettingsIfNeeded();
    this.props.loadMainNavIfNeeded();
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

const asyncProps = [{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    if (!arePagesLoaded(getState())) {
      promises.push(dispatch(fetchPagesIfNeeded()));
    }
    if (!isNavLoaded(getState())) {
      promises.push(dispatch(loadMainNavIfNeeded()));
    }
    if (!areSettingsLoaded(getState())) {
      promises.push(dispatch(fetchSettingsIfNeeded()));
    }
    return Promise.all(promises);
  },
}];
function mapStateToProps(state) {
  return {
    boldr: state.boldr,
    settings: getSettings(state),
    auth: state.auth,
    notifications: state.notifications,
    navigation: getByLabel(state, 'main'),
  };
}

export default asyncConnect(asyncProps, mapStateToProps, {
  fetchSettingsIfNeeded, fetchPagesIfNeeded, loadMainNavIfNeeded })(BoldrWrapper);
