/* eslint-disable */
import React from 'react';

export default ({ children }) => {
  if (module.hot) {
    const AppContainer = require('react-hot-loader').AppContainer;
    return <AppContainer>{React.Children.only(children)}</AppContainer>;
  }
  return React.Children.only(children);
};
