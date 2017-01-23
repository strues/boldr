/* @flow */
/* eslint-disable global-require */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import type { ReactChildren } from '../../types/react';
import config from '../../core/utils/config';
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
      <Helmet
        htmlAttributes={ config('htmlPage.htmlAttributes') }
        titleTemplate={ config('htmlPage.titleTemplate') }
        defaultTitle={ config('htmlPage.defaultTitle') }
        meta={ config('htmlPage.meta') }
        link={ config('htmlPage.links') }
        script={ config('htmlPage.scripts') }
      />
      { React.Children.toArray(props.children) }
      <Notifications />
    </div>
  );
}

export default App;
