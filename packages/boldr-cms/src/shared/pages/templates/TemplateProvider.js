/* @flow */
import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { provideHooks } from 'redial';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';

import { isMobile as testIfMobile } from '../../core/utils/helpers';
import { setMobileDevice } from '../../state/modules/boldr/ui';
// import { fetchPagesIfNeeded } from '../../state/modules/boldr/pages';
import { fetchMenusIfNeeded, getByLabel } from '../../state/modules/boldr/menu';
import { fetchSettingsIfNeeded, getSettings } from '../../state/modules/boldr/settings';

type Props = {
  pathname: string,
  auth: Object,
  fetchSettingsIfNeeded: Function,
  dispatch: Function,
  location: Object,
  fetchPagesIfNeeded: Function,
  fetchMenusIfNeeded: Function,
  setMobileDevice: Function,
  isMobile: Boolean,
  settings: Object
};

const mapStateToProps = (state) => {
  return {
    auth: state.account.auth,
    pathname: state.routing.locationBeforeTransitions.pathname,
  };
};

@provideHooks({
  fetch: ({ dispatch }) => {
    return Promise.all([
      dispatch(fetchSettingsIfNeeded()),
      dispatch(fetchMenusIfNeeded()),
    ]);
  },
})
@connect(mapStateToProps)
export default (ComposedComponent: any) => {
  class TemplateProvider extends Component {
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
      this.props.dispatch(fetchMenusIfNeeded());
      this.props.dispatch(fetchSettingsIfNeeded());
      window.addEventListener('resize', debounce(event => {
        this.props.dispatch(setMobileDevice(testIfMobile()));
      }, 1000));
    }
    // $FlowIssue
    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    }
    props: Props;

    getPageURL() {
      return (typeof(window) !== 'undefined')
      ? window.location.href
      : `http://localhost:3000/${this.props.pathname}`;
    }
    render() {
      return (<ComposedComponent { ...this.props } url={ this.getPageURL() } />);
    }
  }

  return TemplateProvider;
};
