/* @flow */

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import shallowCompare from 'react-addons-shallow-compare';
import { debounce } from 'lodash';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import type { ReactElement } from 'types/react';
import { Notifications } from 'components/index';
import {
  getSettings,
  fetchSettingsIfNeeded,
  fetchPagesIfNeeded,
  loadMainNavIfNeeded,
  getByLabel,
  setMobileDevice,
} from 'state/index';
import { isMobile as testIfMobile } from 'core/utils';
import htmlPageConfig from '../../../../config/public/htmlPage';

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

@provideHooks({
  fetch: ({ dispatch }) => {
    return Promise.all([
      dispatch(fetchSettingsIfNeeded()),
      dispatch(loadMainNavIfNeeded()),
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
    this.props.dispatch(loadMainNavIfNeeded());
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
          htmlAttributes={ htmlPageConfig.htmlAttributes }
          titleTemplate={ htmlPageConfig.titleTemplate }
          defaultTitle={ htmlPageConfig.defaultTitle }
          meta={ htmlPageConfig.meta }
          link={ htmlPageConfig.links }
          script={ htmlPageConfig.scripts }
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
    navigation: getByLabel(state, 'main'),
    ui: state.ui,
    isMobile: state.ui.isMobile,
  };
}

export default connect(mapStateToProps)(App);
