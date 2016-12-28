/* @flow */

import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import type { ReactChildren } from '../../types/react';
import { setMobileDevice } from '../../state/modules/boldr/ui';
import { fetchPagesIfNeeded } from '../../state/modules/boldr/pages';
import { fetchMenusIfNeeded, getByLabel } from '../../state/modules/boldr/menu';
import { fetchSettingsIfNeeded, getSettings } from '../../state/modules/boldr/settings';
import { isMobile as testIfMobile } from '../../core/utils/helpers';
import { safeConfigGet } from '../../core/utils/config';
import Notifications from '../Notification';

import '../../theme/styles/main.scss';

type Props = {
  children: ReactChildren,
  fetchSettingsIfNeeded: Function,
  dispatch: Function,
  location: Object,
  fetchPagesIfNeeded: Function,
  fetchMenusIfNeeded: Function,
  setMobileDevice: Function,
  isMobile: Boolean,
  settings: Object
};

@provideHooks({
  fetch: ({ dispatch }) => {
    return Promise.all([
      dispatch(fetchSettingsIfNeeded()),
      dispatch(fetchMenusIfNeeded()),
      dispatch(fetchPagesIfNeeded()),
    ]);
  },
})
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
    this.props.dispatch(fetchPagesIfNeeded());
    this.props.dispatch(fetchMenusIfNeeded());
    this.props.dispatch(fetchSettingsIfNeeded());
    window.addEventListener('resize', debounce(event => {
      this.props.dispatch(setMobileDevice(testIfMobile()));
    }, 1000));
  }
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  props: Props;
  render() {
    return (
    <div>
      <Helmet
        htmlAttributes={ safeConfigGet(['htmlPage', 'htmlAttributes']) }
        titleTemplate={ safeConfigGet(['htmlPage', 'titleTemplate']) }
        defaultTitle={ safeConfigGet(['htmlPage', 'defaultTitle']) }
        meta={ safeConfigGet(['htmlPage', 'meta']) }
        link={ safeConfigGet(['htmlPage', 'links']) }
        script={ safeConfigGet(['htmlPage', 'scripts']) }
      />
      { React.Children.toArray(this.props.children) }
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
    notifications: state.notifications,
    menu: getByLabel(state, 'main'),
    ui: state.boldr.ui,
    isMobile: state.boldr.ui.isMobile,
  };
}

export default connect(mapStateToProps)(App);
