import React from 'react';
import Route from 'react-router-dom/Route';
import About from './About';
import Error404 from './Error404';
import Home from './Home';

import Scene from '../core/sceneConnector';

export default new Scene({
  route: [
    <Route exact path="/" component={Home} />,
    <Route exact path="/about" component={About} />,

    <Route path="*" component={Error404} />,
  ],
});
