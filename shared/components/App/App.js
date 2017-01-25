/* @flow */
/* eslint-disable global-require */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import type { ReactChildren } from '../../types/react';
import Notifications from '../Notification';

if (process.env.NODE_ENV !== 'test') {
  require('../../theme/styles/main.scss');
}

type Props = {
  children: ReactChildren,
};

function App(props: Props) {
  return (
    <div>
      { React.Children.toArray(props.children) }
      <Notifications />
    </div>
  );
}

export default App;
