import React from 'react';
import { ThemeProvider as Provider } from 'styled-components';

import theme from './theme';

const ThemeProvider = props => (
  <Provider theme={Object.assign({}, theme, props.theme)}>{props.children}</Provider>
);

export default ThemeProvider;
