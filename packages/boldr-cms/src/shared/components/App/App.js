/* @flow */
/* eslint-disable global-require */
import '../../styles/main.scss';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { fetchSettingsIfNeeded, selectSettings } from '../../state/modules/boldr/settings';
import { makeSelectUi } from '../../state/modules/boldr/ui';
import { StyleClasses } from '../../theme/theme';
import type { ReactChildren } from '../../types/react';
import Notifications from '../Notification';

const BASE_ELEMENT = StyleClasses.APP;

type Props = {
  children: ReactChildren,
  dispatch: Function,
  className: string,
  location: Object,
};

const mapStateToProps = createStructuredSelector({
  ui: makeSelectUi(),
});

@connect(mapStateToProps)
class App extends Component {
  static fetchData(dispatch) {
    return Promise.all([dispatch(fetchSettingsIfNeeded())]);
  }
  static displayName = 'App';
  static childContextTypes = {
    dispatch: React.PropTypes.func,
    location: React.PropTypes.object,
  };
  getChildContext() {
    const {
      dispatch,
      location,
    } = this.props;
    return {
      dispatch,
      location,
    };
  }

  componentDidMount() {
    const { dispatch, location } = this.props;

    App.fetchData(dispatch);
  }

  props: Props;

  render() {
    const { className, children } = this.props;

    const classes = classnames('boldr', BASE_ELEMENT, className);
    return (
      <div className={ classes }>
        {React.Children.toArray(children)}
        <Notifications />
      </div>
    );
  }
}

export default App;
