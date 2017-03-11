/* @flow */
/* eslint-disable global-require */
import '../../styles/main.scss';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import debounce from 'lodash/debounce';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { testIfMobile } from 'boldr-utils';

import { fetchSettingsIfNeeded, selectSettings } from '../../state/modules/boldr/settings';
import { makeSelectMobile, makeSelectUi, setMobileDevice } from '../../state/modules/boldr/ui';
import { StyleClasses } from '../../theme/theme';
import type { ReactChildren } from '../../types/react';
import Notifications from '../Notification';

const BASE_ELEMENT = StyleClasses.APP;

type Props = {
  children: ReactChildren,
  dispatch: Function,
  className: string,
  location: Object,
  isMobile: boolean,
};

const mapStateToProps = createStructuredSelector({
  ui: makeSelectUi(),
  isMobile: makeSelectMobile(),
});

@connect(mapStateToProps)
class App extends Component {
  static fetchData(dispatch) {
    return Promise.all([
      dispatch(fetchSettingsIfNeeded()),
    ]);
  }
  static displayName = 'App';
  static childContextTypes = {
    dispatch: React.PropTypes.func,
    isMobile: React.PropTypes.bool,
    location: React.PropTypes.object,
  }
  getChildContext() {
    const {
      dispatch,
      isMobile,
      location,
    } = this.props;
    return {
      dispatch,
      isMobile,
      location,
    };
  }

  componentDidMount() {
    const { dispatch, location } = this.props;

    App.fetchData(dispatch);
    window.addEventListener('resize', debounce(event => {
      dispatch(setMobileDevice(testIfMobile()));
    }, 1000));
  }

  componentWillUnmount() {
    window.removeEventListener('resize');
  }

  props: Props;

  render() {
    const { className, children } = this.props;

    const classes = classnames(
      'boldr',
      BASE_ELEMENT,
      className,
    );
    return (
    <div className={ classes }>
      { React.Children.toArray(children) }
      <Notifications />
    </div>
    );
  }
}

export default App;
