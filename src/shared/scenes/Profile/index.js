import React from 'react';
import Route from 'react-router-dom/Route';
import Scene from '../../core/sceneConnector';

import ProfileContainer from './ProfileContainer';

export default new Scene({
  route: [
    <Route exact path="/profiles/:username" component={ProfileContainer} />,
  ],
});
