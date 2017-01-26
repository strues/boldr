/* @flow */
/* eslint-disable global-require */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import type { ReactChildren } from '../../types/react';

import Notifications from '../Notification';

if (process.env.NODE_ENV !== 'test') {
  require('../../styles/main.scss');
}

type Props = {
  children: ReactChildren,
};

class App extends Component {
  props: Props;
  render() {
    return (
      <div>
        <Notifications />
        { React.Children.toArray(this.props.children) }
      </div>
    );
  }
}
export default App;
