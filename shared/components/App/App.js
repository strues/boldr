/* @flow */
/* eslint-disable global-require */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import debounce from 'lodash/debounce';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import testIfMobile from '../../core/utils/testIfMobile';
import { fetchSettingsIfNeeded, selectSettings } from '../../state/modules/boldr/settings';
import { makeSelectMobile, makeSelectUi, setMobileDevice } from '../../state/modules/boldr/ui';
import type { ReactChildren } from '../../types/react';
import Notifications from '../Notification';
import styled from 'styled-components';

if (process.env.NODE_ENV !== 'test') {
  require('../../styles/main.scss');
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  box-sizing: border-box;
`;

type Props = {
  children: ReactChildren,
  dispatch: Function,
  location: Object,
  isMobile: Boolean,
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
    return (
    <Wrapper>
      { React.Children.toArray(this.props.children) }
      <Notifications />
    </Wrapper>
    );
  }
}

export default App;
