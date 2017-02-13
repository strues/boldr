/* @flow */
/* eslint-disable global-require */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import debounce from 'lodash/debounce';
import { createStructuredSelector } from 'reselect';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import testIfMobile from '../../core/utils/testIfMobile';
import { fetchSettingsIfNeeded, selectSettings } from '../../state/modules/boldr/settings';
import { makeSelectMobile, makeSelectUi, setMobileDevice } from '../../state/modules/boldr/ui';
import type { ReactChildren } from '../../types/react';
import Notifications from '../Notification';


if (process.env.NODE_ENV !== 'test') {
  require('../../styles/main.scss');
}

type Props = {
  children: ReactChildren,
  dispatch: Function,
  location: Object,
  isMobile: Boolean,
};

@provideHooks({
  fetch: ({ dispatch }) => {
    return dispatch(fetchSettingsIfNeeded());
  },
})
class App extends Component {
  static childContextTypes = {
    dispatch: React.PropTypes.func,
    isMobile: React.PropTypes.bool,
    location: React.PropTypes.object,
  }
  getChildContext() {
    const { dispatch, isMobile, location } = this.props;
    return { dispatch, isMobile, location };
  }

  componentDidMount() {
    const { dispatch, location } = this.props;

    window.addEventListener('resize', debounce(event => {
      dispatch(setMobileDevice(testIfMobile()));
    }, 1000));
  }

  componentWillUnmount() {
    window.removeEventListener('resize');
  }

  props: Props;

  render() {
    return (
    <div>
      { React.Children.toArray(this.props.children) }
      <Notifications />
    </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  ui: makeSelectUi(),
  isMobile: makeSelectMobile(),
});

export default connect(mapStateToProps)(App);
