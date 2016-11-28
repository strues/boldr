/* @flow */

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { debounce } from 'lodash';
import { asyncConnect } from 'redux-connect';
import type { ReactElement } from 'types/react';
import { Notifications } from 'components/index';
import {
  areSettingsLoaded,
  arePagesLoaded,
  getSettings,
  isNavLoaded,
  fetchSettingsIfNeeded,
  fetchPagesIfNeeded,
  loadMainNavIfNeeded,
  getByLabel,
  setMobileDevice,
} from 'state/index';
import { isMobile as testIfMobile } from 'core/utils';
import meta from 'core/config/base';
// $FlowIssue
import 'theme/styles/main.scss';

type Props = {
  children: ReactElement,
  fetchSettingsIfNeeded: Function,
  dispatch: Function,
  location: Object,
  isNavLoaded: () => void,
  loadMainNav: () => void,
  fetchPagesIfNeeded: Function,
  loadMainNavIfNeeded: Function,
  setMobileDevice: Function,
  isMobile: Boolean,
  settings: Object
};

class App extends Component {
  static childContextTypes = {
    dispatch: React.PropTypes.func,
    location: React.PropTypes.object,
    isMobile: React.PropTypes.bool,
  };
  getChildContext() {
    const { dispatch, location, isMobile } = this.props;
    return { dispatch, location, isMobile };
  }
  componentDidMount() {
    this.props.fetchSettingsIfNeeded();
    this.props.loadMainNavIfNeeded();

    window.addEventListener('resize', debounce(event => {
      this.props.setMobileDevice(testIfMobile());
    }, 1000));
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
    ui: state.ui,
    isMobile: state.ui.isMobile,
  };
}

export default asyncConnect(asyncProps, mapStateToProps, {
  fetchSettingsIfNeeded, fetchPagesIfNeeded, setMobileDevice, loadMainNavIfNeeded })(App);
