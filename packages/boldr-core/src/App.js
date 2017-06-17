/**
 * @module boldr-core/lib/App
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import RegistryProvider from './RegistryProvider';
import UIRouter from './UIRouter';

/*
 * The React component that render your app and provide everythings you need
 * @param  {object} props store and history
 * @return {object} ReactElement
 */
export default function App(props) {
  const hist = props.history || history.get(props.store);
  return (
    <Provider store={props.store}>
      <RegistryProvider>
        {props.children}
      </RegistryProvider>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.node,
  history: PropTypes.object,
};
