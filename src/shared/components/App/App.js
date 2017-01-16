/* @flow */
/* eslint-disable global-require */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import type { ReactChildren } from '../../types/react';
import { safeConfigGet } from '../../core/utils/config';
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
        htmlAttributes={ safeConfigGet(['htmlPage', 'htmlAttributes']) }
        titleTemplate={ safeConfigGet(['htmlPage', 'titleTemplate']) }
        defaultTitle={ safeConfigGet(['htmlPage', 'defaultTitle']) }
        meta={ safeConfigGet(['htmlPage', 'meta']) }
        link={ safeConfigGet(['htmlPage', 'links']) }
        script={ safeConfigGet(['htmlPage', 'scripts']) }
      />
      { React.Children.toArray(props.children) }
      <Notifications />
    </div>
  );
}

export default App;
