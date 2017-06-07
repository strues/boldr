import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Header from 'components/Header';
import Home from 'routes/Home';

import classes from './CoreLayout.scss';

import 'styles/core.scss';

export const CoreLayout = () =>
  <div>
    <Header />

    <div className={classes.mainContainer}>
      <Switch>
        <Route {...Home} />
      </Switch>
    </div>
  </div>;

export default CoreLayout;
